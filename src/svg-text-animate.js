/**
* @fileOverview Svg-text-animate is a JavaScript library for convert text to SVG stroke animations in the browser.
* @author oubenruing
* @version 1.2.0
*/

import * as opentype from 'opentype.js';
import CSSCreator from './creator/CSSCreator';
import Tools from "./tools/tools.js"
import {DEFAULT_STROKE} from "./config/config.js" 
export default class SVGTextAnimate {
  /**
   *Creates an instance of SVGTextAnimate.
   * @param {String} fontfile Path of fontfile
   * @param {Object} options  {duration,timing-function,iteration-count,direction,fill-mode,delay,mode}
   * @param {Object} stroke   {stroke,stroke-width,font-size}
   * @param {String} creator  The mode of animation, use CSSCreator by default.
   * 
   */
  constructor(fontfile, options, stroke, creator) {
    this.loaded = false;
    this.fontfile = fontfile;
    switch(creator){
      case "svg": this.creator = new SVGCreator(options);break;
      default: this.creator = new CSSCreator(options);
    }
    this.stroke =  Tools.deepCopy(DEFAULT_STROKE);
    this.setStroke(stroke);
    this.fatherdom = null
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
      opentype.load(fontfile || this.fontfile, (err, openfont) => {
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
    this.creator.setOptions(options);
    return this;
  }

  /**
   * Set the DOM to insert
   *
   * @param {DOM} dom
   * @returns {SVGTextAnimate} current instance
   */
  setFatherDom(dom) {
    this.fatherdom=dom;
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
   *  Generate svg animation from the stroked path of the given string 
   *  and replace the contents of the selector DOM
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
    const fatherdom = this.fatherdom || document.querySelector(selector)  ;
    if(fatherdom == null){
      console.error("no such fatherdom");
      return
    }
    const svgDom = this.createSVGDom(text);
    fatherdom.innerHTML(svgDom);
    return this;
  }

  /**
   *
   * Generate svg animation from the stroked path of the given string 
   *  and inserts it into the DOM of the selector 
   *
   * @param {String} text 
   * @param {String} selector
   * @returns {SVGTextAnimate} current instance
   */
  add(text, selector) {
    if (!this.loaded) {
      console.error("Fontfile does not loaded");
      return
    }
    const fatherdom = this.fatherdom || document.querySelector(selector)  ;
    if(fatherdom == null){
      console.error("no such fatherdom");
      return
    }
    const svgDom = this.createSVGDom(text);
    fatherdom.appendChild(svgDom);
    return this;
  }


  /**
   *
   *
   * @param {Sting} text
   * @returns {DOM} svgDom
   */
  createSVGDom(text){
    let svgDom = null
    let svgpath = "";
    const _div = document.createElement("div")
    const paths = this.font.getPaths(text, 0, this.stroke["font-size"], this.stroke["font-size"]);
    const box = this.getBounding(paths);
    //remove the unit;
    const end = this.stroke["stroke-width"].search(/[A-Za-z]+$/);
    const strokeWidth = Number(this.stroke["stroke-width"].substring(0, end))

    const svg = `<svg width="${box.x2 - box.x1 + strokeWidth}" height="${box.y2 - box.y1}" viewBox="${box.x1} ${box.y1} ${box.x2 + strokeWidth} ${box.y2 + strokeWidth}" xmlns="http://www.w3.org/2000/svg">\
    <g id="svgGroup" stroke-linecap="round" stroke="#000" fill="none" style="fill:none; stroke:${this.stroke.stroke};stroke-width:${this.stroke["stroke-width"]};"></g>\
    </svg>`
    
    _div.innerHTML = svg
    svgDom = _div.querySelector("svg");
    
    paths.forEach(path => {
      svgpath += path.toSVG(2)
    });
    svgDom.querySelector("g").innerHTML = svgpath;
    return this.creator.create(svgDom);
  }
}
