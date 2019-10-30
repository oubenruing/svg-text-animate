// var opentype = require('opentype.js');
// var makerjs = require('makerjs');
// var Vivus = require('vivus');
import * as opentype from 'opentype.js';
import makerjs from "makerjs"
import Vivus from "vivus"

export default class SVGTextAnimate {
  constructor(fontfile) {
    this.fontfile = fontfile;
  }

  // setFont(font) {
  //   opentype.loadSync(font)
  // }

  setFont(fontfile) {
    const _this = this
    // const ofont = await opentype.load(font);
    // console.log(ofont);
    // const path = ofont.getPath('Hello, World!', 0, 150, 72);

    return new Promise(function(resove,reject){
      opentype.load(_this.fontfile, function (err, openfont) {
        if (err) {
          console.err('the font' + _this.fontfile + 'could not be loaded :(');
          reject();
        } else {
          _this.font = openfont
          resove(true);
        }
      })
    })
  }

  create(text, fatherdom, fontsize) {
    const _this = this
    const textModel = new makerjs.models.Text(_this.font, text, fontsize || 72);
    const svg = makerjs.exporter.toSVG(textModel);
    const dom = document.querySelector(fatherdom);
    dom.innerHTML = svg
    const svgDom = dom.querySelector("svg");
    console.log(svgDom)
    const v = new Vivus(svgDom, { duration: 1000 });
    v.reset().play(1);
  }
}