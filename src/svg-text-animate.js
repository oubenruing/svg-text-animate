// var opentype = require('opentype.js');
// var makerjs = require('makerjs');
// var Vivus = require('vivus');
import * as opentype from 'opentype.js';
import Vivus from "vivus"

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

  animate(svgDom, options) {
    const _options={

    }
    let style = svgDom.querySelector("style");
    const paths = svgDom.querySelectorAll("path");

    if (style != null) {
      style.innerHTML = "";
    }
    else{
      style = document.createElement("style");
      svgDom.appendChild(style);
    }

    paths.forEach((path)=>{
      path.getTotalLength();
    })
    
    let keyframes = "@keyframes draw{to{stroke-dashoffset:0}}"
  }

  create(text, selector, duration, options) {
    const _this = this
    const paths = _this.font.getPaths(text, 0, _this.fontsize, _this.fontsize);
    const box = _this.getBoundingBox(paths);
    const svg = `<svg width="${box.x2 - box.x1}" height="${box.y2 - box.y1}" viewBox="${box.x1} ${box.y1} ${box.x2} ${box.y2}" xmlns="http://www.w3.org/2000/svg"><g id="svgGroup" stroke-linecap="round" fill-rule="evenodd" font-size="72px" stroke="#000" stroke-width="1px" fill="none" style="stroke:#000;stroke-width:1px;fill:none"></g></svg>`
    const fatherdom = document.querySelector(selector);
    fatherdom.innerHTML = svg

    const svgDom = fatherdom.querySelector("svg");
    const group = svgDom.querySelector("g");

    let svgpath = "";
    paths.forEach(path => {
      svgpath += path.toSVG(2)
    });
    group.innerHTML = svgpath;
    _this.animate(svgDom);
    // _this.controllers.push(new Vivus(svgDom, { duration: duration || 480, type: "delayed" }));
    // return _this.controllers[_this.controllers.length - 1]
  }
}