import * as opentype from 'opentype.js';
export default class SVGTextAnimate {
  constructor(fontfile, fontsize) {
    this.fontfile = fontfile;
    this.fontsize = fontsize || 72;
    this.controllers = [];
  }
  setFont(fontfile) {
    const _this = this
    return new Promise(function (resove, reject) {
      opentype.load(fontfile || _this.fontfile, function (err, openfont) {
        if (err) {
          console.err('the font' + fontfile || _this.fontfile + 'could not be loaded :(');
          reject();
        } else {
          _this.font = openfont
          resove(true);
        }
      })
    })
  }

  setFontSize(fontsize) {
    this.fontsize = fontsize;
  }

  getBoundingBox(paths) {
    const x2 = paths[paths.length - 1].getBoundingBox().x2
    const y2 = paths.reduce(
      (r, c) => {
        return r.getBoundingBox().y2 >= c.getBoundingBox().y2 ? r : c;
      }).getBoundingBox().y2
    return { x1: 0, y1: 0, x2, y2 }
  }

  animatePath(svgDom, options) {
    const _options = {
      "duration": 1000,
      "timing-function": "linear",
      "iteration-count": 1,
      "direction": "normal",
      "fill-mode": "forwards",
      "delay": 0,
      "mode": "sync"
    }
    Object.assign(_options, options);

    let style = svgDom.querySelector("style");
    const paths = svgDom.querySelectorAll("path");

    if (style != null) {
      style.innerHTML = "";
    }
    else {
      style = document.createElement("style");
      style.innerHTML = "@keyframes STAdraw{to{stroke-dashoffset:0}}"
      svgDom.appendChild(style);
    }


    paths.forEach((path, i) => {
      const pathLength = Math.ceil(path.getTotalLength());
      const stroke = `stroke-dasharray:${pathLength - 1} ${pathLength + 1};stroke-dashoffset:${pathLength};`
      let animation = ""
      switch (_options.mode) {
        case "sync": animation = `animation: STAdraw ${_options["duration"]}ms ${_options["timing-function"]} 0ms ${_options["fill-mode"]} ${_options["iteration-count"]}`; break;
        case "delay": animation = `animation: STAdraw ${_options["duration"]}ms ${_options["timing-function"]} ${_options.delay * i}ms ${_options["fill-mode"]} ${_options["iteration-count"]}`; break;
        case "onebyone": animation = `animation: STAdraw ${_options["duration"]}ms ${_options["timing-function"]} ${_options["duration"] * i}ms ${_options["fill-mode"]} ${_options["iteration-count"]}`; break;
      }
      path.style.cssText = stroke + animation
      console.log(stroke + animation);
    })
  }

  create(text, selector, options, style) {
    const _this = this
    const paths = _this.font.getPaths(text, 0, _this.fontsize, _this.fontsize);
    const box = _this.getBoundingBox(paths);
    console.log(box);
    const _style = {
      "stroke": "#000",
      "stroke-width": "1px",
    }
    Object.assign(_style, style);
    const end = _style["stroke-width"].search(/[A-Za-z]+$/);
    const strokeWidth = Number(_style["stroke-width"].substring(0, end))
    const svg = `<svg width="${box.x2 - box.x1 + strokeWidth / 2}" height="${box.y2 - box.y1}" viewBox="${box.x1} ${box.y1} ${box.x2 + strokeWidth / 2} ${box.y2 + strokeWidth / 2}" xmlns="http://www.w3.org/2000/svg">\
    <g id="svgGroup" stroke-linecap="round" fill-rule="evenodd" font-size="72px" stroke="#000" stroke-width="1px" fill="none" style="fill:none; stroke:${_style.stroke};stroke-width:${_style["stroke-width"]}"></g>\
    </svg>`
    const fatherdom = document.querySelector(selector);
    const _div = document.createElement("div")
    _div.innerHTML = svg
    const svgDom = _div.querySelector("svg");
    const group = svgDom.querySelector("g");

    let svgpath = "";
    paths.forEach(path => {
      svgpath += path.toSVG(2)
    });
    group.innerHTML = svgpath;
    _this.animatePath(svgDom, options);
    fatherdom.innerHTML = _div.innerHTML;
  }
}