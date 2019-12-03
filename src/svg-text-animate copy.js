/**
* @fileOverview Svg-text-animate is a JavaScript library for convert text to SVG stroke animations in the browser.
* @author oubenruing
* @version 1.2.0
*/

import * as opentype from 'opentype.js';
export default class SVGTextAnimate {
  /**
   *Creates an instance of SVGTextAnimate.
   * @param {String} fontfile Path of fontfile
   * @param {Object} options  {duration,timing-function,iteration-count,direction,fill-mode,font-size,delay,mode}
   * @param {Object} stroke   {stroke,stroke-width}
   * 
   */
  constructor(fontfile, options, stroke) {
    this.loaded = false;
    this.fontfile = fontfile;
    this.options = {
      "duration": 1000,
      "timing-function": "linear",
      "iteration-count": 1,
      "direction": "normal",
      "fill-mode": "freeze",
      "font-size": 72,
      "delay": 0,
      "mode": "sync"
    };
    this.stroke = {
      "stroke": "#000",
      "stroke-width": "1px",
    }
    this.setOptions(options);
    this.setStroke(stroke);
  }

  /**
   * Load a font file from a given path
   * Asynchronous method
   *
   * @param {String} fontfile
   * @returns {Promise} A promise Object
   * 
   */
  setFont(fontfile) {
    return new Promise((resove, reject)=>{
      opentype.load(fontfile || this.fontfile,(err, openfont)=>{
        if (err) {
          console.error('font could not be loaded :(');
          reject();
        } else {
          this.font = openfont
          this.loaded = true
          resove(true);
        }
      })
    }).catch(function(reason) {
      console.log('catch:', reason);
    });
  }


  /**
   * set options of current instance
   *
   * @param {Object} options
   * @returns {SVGTextAnimate} current instance
   * 
   */
  setOptions(options) {
    Object.assign(this.options, options);
    return this;
  }


  /**
   * set stroke of current instance
   *
   * @param {Object} stroke
   * @returns {SVGTextAnimate} current instance
   * 
   */
  setStroke(stroke) {
    Object.assign(this.stroke, stroke);
    return this;
  }

  /**
   * Calculate the image boundary of a given path array
   *
   * @param {Array<Path>} paths
   * @returns {Object} boundary{x1, y1, x2, y2}
   * @memberof SVGTextAnimate
   * 
   */
  getBounding(paths) {
    if(paths.length==0){
      console.error("path does not exist");
      return {x1: 0, y1: 0, x2: 0, y2: 0 }
    }
    const x2 = paths[paths.length - 1].getBoundingBox().x2
    const y2 = paths.reduce(
      (r, c) => {
        return r.getBoundingBox().y2 >= c.getBoundingBox().y2 ? r : c;
      }).getBoundingBox().y2
    return { x1: 0, y1: 0, x2, y2 }
  }


  /**
   * Add animation to svgDom according to current instance's options and stoke
   *
   * @param {DOM} svgDom
   * @returns {DOM} svgDom
   */
  // animatePath(svgDom) {
  //   const _options = this.options;
  //   let style = svgDom.querySelector("style");
  //   const paths = svgDom.querySelectorAll("path");

  //   if (style != null) {
  //     style.innerHTML = "";
  //   }
  //   else {
  //     style = document.createElement("style");
  //   }
  //   style.innerHTML = "@keyframes STAdraw{to{stroke-dashoffset:0}}"
  //   svgDom.appendChild(style);


  //   paths.forEach((path, i) => {
  //     const pathLength = Math.ceil(path.getTotalLength());
  //     const stroke = `stroke-dasharray:${pathLength - 1} ${pathLength + 1};stroke-dashoffset:${pathLength};`
  //     let animation = ""
  //     switch (_options.mode) {
  //       case "sync": animation = `animation: STAdraw ${_options["duration"]}ms ${_options["timing-function"]} 0ms ${_options["fill-mode"]} ${_options["direction"]} ${_options["iteration-count"]}`; break;
  //       case "delay": animation = `animation: STAdraw ${_options["duration"]}ms ${_options["timing-function"]} ${_options.delay * i}ms ${_options["fill-mode"]} ${_options["direction"]} ${_options["iteration-count"]}`; break;
  //       case "onebyone": animation = `animation: STAdraw ${_options["duration"]}ms ${_options["timing-function"]} ${_options["duration"] * i}ms ${_options["fill-mode"]} ${_options["direction"]} ${_options["iteration-count"]}`; break;
  //     }
  //     path.style.cssText = stroke + animation
  //   })
  //   return svgDom
  // }

  animatePath(svgDom) {
      const _options = this.options;
      let animate = "<animate"
      const paths = svgDom.querySelectorAll("path");
      animate+=" attributeName="+"stroke-dashoffset";
      animate+=" to="+"0"
      animate+=" dur="+_options["duration"]+"ms"
      animate+=" calcMode="+_options["timing-function"]
      animate+=" repeatCount="+ _options["iteration-count"]
      animate+=" fill=" + _options["fill-mode"]
      console.log(animate)
      paths.forEach((path, i) => {
        let _animate = animate
        const pathLength = Math.ceil(path.getTotalLength());
        const stroke = `stroke-dasharray:${pathLength - 1} ${pathLength + 1};stroke-dashoffset:${pathLength};`
        switch (_options.mode) {
          case "sync": _animate+=" begin="+ "0ms"; break;
          case "delay": _animate+=" begin="+ _options.delay * i+"ms"; break;
          case "onebyone": _animate+=" begin="+ _options["duration"] * i + "ms"; break;
          default :_animate+=" begin="+ _options.mode; break;
        }
        _animate+=" />"
        path.style.cssText = stroke
        path.innerHTML=_animate;
      })
      return svgDom
    }

  /**
   *  Generate svg animation from the stroked path of the given string 
   *  and inserts it into the DOM of the selector 
   *
   * @param {String} text 
   * @param {String} selector
   * @returns {SVGTextAnimate} current instance
   * 
   */
  create(text, selector) {
    if (!this.loaded) {
      console.error("Fontfile does not loaded");
      return
    }
    const fatherdom = document.querySelector(selector);
    if(fatherdom == null){
      console.error("no such element");
      return
    }
    const paths = this.font.getPaths(text, 0, this.options["font-size"], this.options["font-size"]);
    const box = this.getBounding(paths);
    const end = this.stroke["stroke-width"].search(/[A-Za-z]+$/);
    const strokeWidth = Number(this.stroke["stroke-width"].substring(0, end))
    const svg = `<svg width="${box.x2 - box.x1 + strokeWidth}" height="${box.y2 - box.y1}" viewBox="${box.x1} ${box.y1} ${box.x2 + strokeWidth} ${box.y2 + strokeWidth}" xmlns="http://www.w3.org/2000/svg">\
    <g stroke-linecap="round" stroke="#000" stroke-width="1px" fill="none" style="fill:none; stroke:${this.stroke.stroke};stroke-width:${this.stroke["stroke-width"]};"></g>\
    </svg>`
    const _div = document.createElement("div")
    _div.innerHTML = svg
    const svgDom = _div.querySelector("svg");
    const group = svgDom.querySelector("g");
    let svgpath = "";
    paths.forEach(path => {
      svgpath += path.toSVG(2)
    });
    group.innerHTML = svgpath;
    this.svgDom = this.animatePath(svgDom)
    fatherdom.appendChild(this.svgDom);
    return this;
  }

  download(){
    const a = document.createElement('a');
    const blob = new Blob([this.svgDom.outerHTML], {type: "image/svg+xml"});
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = "svg-text-animate.svg";
    a.click();
  }
}
