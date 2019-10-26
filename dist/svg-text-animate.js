/**
 * https:// | (c) Frederik De Bleser and other contributors | MIT License | Uses a by A and b by B
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.SVGTextAnimate = factory());
}(this, (function () { 'use strict';

  var opentype = require('opentype.js');
  var makerjs = require('makerjs');
  var Vivus = require('vivus');
  // var opentype = require('opentype.js');
  // import makerjs from "makerjs"
  // import Vivus from "vivus"

  var SVGTextAnimate = function SVGTextAnimate(fontfile) {
    this.fontfile = fontfile;
  };

  // setFont(font) {
  // opentype.loadSync(font)
  // }

  SVGTextAnimate.prototype.setFont = function setFont (fontfile) {
    var _this = this;
    // const ofont = await opentype.load(font);
    // console.log(ofont);
    // const path = ofont.getPath('Hello, World!', 0, 150, 72);

    return new Promise(function(resove,reject){
      opentype.load(_this.fontfile, function (err, openfont) {
        if (err) {
          console.err('the font' + _this.fontfile + 'could not be loaded :(');
          reject();
        } else {
          _this.font = openfont;
          resove(true);
        }
      });
    })
  };

  SVGTextAnimate.prototype.create = function create (text, fatherdom, fontsize) {
    var _this = this;
    var textModel = new makerjs.models.Text(_this.font, text, fontsize || 72);
    var svg = makerjs.exporter.toSVG(textModel);
    var dom = document.querySelector(fatherdom);
    dom.innerHTML = svg;
    var svgDom = dom.querySelector("svg");
    console.log(svgDom);
    var v = new Vivus(svgDom, { duration: 1000 });
    v.reset().play(1);
  };

  return SVGTextAnimate;

})));
//# sourceMappingURL=svg-text-animate.js.map
