(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('opentype.js')) :
    typeof define === 'function' && define.amd ? define(['opentype.js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SVGTextAnimate = factory(global.opentype));
})(this, (function (opentype) { 'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var opentype__namespace = /*#__PURE__*/_interopNamespaceDefault(opentype);

    const DEFAULT_OPTIONS = {
        duration: 1000,
        "timing-function": "linear",
        "iteration-count": 1,
        direction: "normal",
        "fill-mode": "forwards",
        delay: 0,
        mode: "sync"
    };
    const DEFAULT_STROKE = {
        stroke: "#000",
        "stroke-width": "1px",
        "font-size": 72,
        "fill-color": "transparent"
    };

    /**
     *
     *
     * @export
     * @class AnimationCreator
     * @Description Abstract class
     */
    class AnimationCreator {
        options;
        svgDom;
        paths;
        /**
         *Creates an instance of AnimationCreator.
         * @param {Object} options
         * @memberof AnimationCreator
         */
        constructor(options) {
            this.options = this.formatOptions(DEFAULT_OPTIONS);
            this.svgDom = null;
            this.setOptions(options);
        }
        /**
         * Set the svgDom
         *
         * @param {DOM} svgDom
         * @memberof AnimationCreator
         */
        setSVGDom(svgDom) {
            this.svgDom = svgDom;
            this.paths = svgDom.querySelectorAll("path");
        }
        /**
         *
         *
         * @param {Object} options
         * @returns {AnimationCreator} current instance
         * @memberof AnimationCreator
         */
        setOptions(options) {
            Object.assign(this.options, this.formatOptions(options));
            return this;
        }
        /**
         * Animate each path
         *
         * @memberof AnimationCreator
         */
        setAllPathsAnimation() {
            this.paths.forEach((path, i) => {
                this.setPathStroke(path);
                this.setPathAnimation(path, i);
            });
        }
        /**
         * Set the path stroke
         *
         * @param {DOM} path
         * @memberof AnimationCreator
         */
        setPathStroke(path) {
            const pathLength = Math.ceil(path.getTotalLength());
            const stroke = `stroke-dasharray:${pathLength - 1} ${pathLength + 1};stroke-dashoffset:${pathLength};`;
            path.style.cssText += stroke;
        }
        /**
         * Function to set the SVG animation , you need to implement in the inheritance class
         *
         * @memberof AnimationCreator
         */
        setSVGAnimation() {
            console.error(this.constructor.name + " do not have setSVGAnimation method.");
        }
        /**
         * Function to set the path animation , you need to implement in the inheritance class
         *
         * @param {Dom} path
         * @param {num} i index of paths
         * @memberof AnimationCreator
         */
        setPathAnimation(path, i) {
            console.error(this.constructor.name + " do not have setPathAnimation method.");
        }
        /**
         * Function to format Options ,using default options
         *
         * @memberof AnimationCreator
         */
        formatOptions(options) {
            console.error(this.constructor.name + " do not have setPathAnimation method.");
        }
        /**
         *
         *
         * @param {DOM} svgDom
         * @returns {DOM} Animated svgDom
         * @memberof AnimationCreator
         */
        create(svgDom) {
            this.setSVGDom(svgDom);
            this.setSVGAnimation();
            this.setAllPathsAnimation();
            return svgDom;
        }
    }

    /**
     *
     *
     * @export
     * @class CSSCreator
     * @extends {AnimationCreator}
     */
    class CSSCreator extends AnimationCreator {
        /**
         *Creates an instance of CSSCreator.
         * @param {Object} options
         * @memberof CSSCreator
         */
        constructor(options) {
            super(options);
        }
        /**
         * Function to set the SVG animation , using CSS animation
         *
         * @memberof CSSCreator
         */
        setSVGAnimation() {
            let style = this.svgDom?.querySelector("style");
            if (style != null) {
                style.innerHTML = "";
            }
            else {
                style = document.createElement("style");
            }
            style.innerHTML =
                "@keyframes STAdraw{to{stroke-dashoffset:0;fill-opacity:1;}}";
            this.svgDom?.appendChild(style);
        }
        /**
         * Function to set the path animation , using CSS animation
         *
         * @param {DOM} path
         * @param {Number} i Index of paths
         * @memberof CSSCreator
         */
        setPathAnimation(path, i) {
            let animation = "";
            const _options = this.options;
            switch (_options.mode) {
                case "sync":
                    animation = `animation: STAdraw ${_options["duration"]}ms ${_options["timing-function"]} 0ms ${_options["fill-mode"]} ${_options["direction"]} ${_options["iteration-count"]};`;
                    break;
                case "delay":
                    animation = `animation: STAdraw ${_options["duration"]}ms ${_options["timing-function"]} ${_options.delay * i}ms ${_options["fill-mode"]} ${_options["direction"]} ${_options["iteration-count"]};`;
                    break;
                case "onebyone":
                    animation = `animation: STAdraw ${_options["duration"]}ms ${_options["timing-function"]} ${_options["duration"] * i}ms ${_options["fill-mode"]} ${_options["direction"]} ${_options["iteration-count"]};`;
                    break;
            }
            path.style.cssText += animation;
        }
        /**
         * Function to format Options ,using default options
         *
         * @param {Object} options Options of creator
         * @memberof CSSCreator
         */
        formatOptions(options) {
            return options;
        }
    }

    /**
     *
     *
     * @export
     * @class SVGCreator
     * @extends {AnimationCreator}
     */
    class SVGCreator extends AnimationCreator {
        /**
         *Creates an instance of SVGCreator.
         * @param {Object} options
         * @memberof SVGCreator
         */
        constructor(options) {
            super(options);
        }
        /**
         * Function to set the SVG animation , using CSS animation
         *
         * @memberof SVGCreator
         */
        setSVGAnimation() { }
        /**
         * Function to set the path animation , using CSS animation
         *
         * @param {Element} path
         * @param {Number} i Index of paths
         * @memberof SVGCreator
         */
        setPathAnimation(path, i) {
            const _options = this.options;
            const animateDom = document.createElementNS("http://www.w3.org/2000/svg", "animate");
            animateDom.setAttributeNS(null, "attributeName", "stroke-dashoffset");
            animateDom.setAttributeNS(null, "to", "0");
            animateDom.setAttributeNS(null, "dur", _options["duration"] + "ms");
            animateDom.setAttributeNS(null, "calcMode", _options["timing-function"]);
            animateDom.setAttributeNS(null, "repeatCount", _options["iteration-count"]);
            animateDom.setAttributeNS(null, "fill", _options["fill-mode"]);
            switch (_options.mode) {
                case "sync":
                    animateDom.setAttributeNS(null, "begin", "0ms");
                    break;
                case "delay":
                    animateDom.setAttributeNS(null, "begin", _options.delay * (i + 1) + "ms");
                    break;
                case "onebyone":
                    animateDom.setAttributeNS(null, "begin", _options["duration"] * i + "ms");
                    break;
                default:
                    animateDom.setAttributeNS(null, "begin", _options.mode);
                    break;
            }
            const fillAnimate = animateDom.cloneNode();
            fillAnimate.setAttributeNS(null, "attributeName", "fill-opacity");
            fillAnimate.setAttributeNS(null, "to", "1");
            path.appendChild(animateDom);
            path.appendChild(fillAnimate);
        }
        /**
         * Function to format Options ,using default options
         *
         * @param {Object} options Options of creator
         * @memberof SVGCreator
         */
        formatOptions(options) {
            if (!options)
                return;
            if (options["timing-function"]) {
                options["timing-function"] = "linear";
            }
            if (options["iteration-count"] === "infinite") {
                options["iteration-count"] = "indefinite";
            }
            if (options["fill-mode"]) {
                if (options["fill-mode"] == "none") {
                    options["fill-mode"] = "remove";
                }
                else {
                    options["fill-mode"] = "freeze";
                }
            }
            return options;
        }
    }

    /**
     * @fileOverview Svg-text-animate is a JavaScript library for convert text to SVG stroke animations in the browser.
     * @author oubenruing
     * @version 1.3.2
     */
    class SVGTextAnimate {
        fontfile;
        loaded;
        creator;
        stroke;
        fatherdom;
        font;
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
            switch (creator) {
                case "svg":
                    this.creator = new SVGCreator(options);
                    break;
                default:
                    this.creator = new CSSCreator(options);
            }
            this.stroke = DEFAULT_STROKE;
            this.setStroke(stroke);
            this.fatherdom = null;
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
            return new Promise((resove, reject) => {
                opentype__namespace.load(fontfile || this.fontfile, (err, openfont) => {
                    if (err) {
                        console.error("font could not be loaded :(");
                        reject();
                    }
                    else {
                        this.font = openfont;
                        this.loaded = true;
                        resove(true);
                    }
                });
            }).catch(function (reason) {
                console.log("catch:", reason);
            });
        }
        /**
         * Load a font file from an ArrayBuffer
         *
         *
         * @param {ArrayBuffer} buffer
         * @returns {SVGTextAnimate} current instance
         */
        setFontFromBuffer(buffer) {
            this.font = opentype__namespace.parse(buffer);
            this.loaded = true;
            return this;
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
            if (paths.length == 0) {
                console.error("path does not exist");
                return { x1: 0, y1: 0, x2: 0, y2: 0 };
            }
            const x2 = paths[paths.length - 1].getBoundingBox().x2;
            const y2 = paths
                .reduce((r, c) => {
                return r.getBoundingBox().y2 >= c.getBoundingBox().y2 ? r : c;
            })
                .getBoundingBox().y2;
            return { x1: 0, y1: 0, x2, y2 };
        }
        /**
         *  Generate svg animation from the stroked path of the given string
         *  clear selector and inserts it into the DOM of the selector
         *
         * @param {String} text
         * @param {String} selector
         * @returns {SVGTextAnimate} current instance
         *
         */
        create(text, selector) {
            if (!this.loaded) {
                console.error("Fontfile does not loaded");
                return;
            }
            const fatherdom = document.querySelector(selector);
            const svgDom = this.createSVGDom(text);
            fatherdom.innerHTML = "";
            fatherdom.appendChild(svgDom);
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
                return;
            }
            const fatherdom = document.querySelector(selector);
            if (fatherdom == null) {
                console.error("no such fatherdom");
                return;
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
        createSVGDom(text) {
            let svgDom = null;
            let svgpath = "";
            const _div = document.createElement("div");
            const paths = this.font.getPaths(text, 0, this.stroke["font-size"], this.stroke["font-size"]);
            const box = this.getBounding(paths);
            //remove the unit;
            const end = this.stroke["stroke-width"].search(/[A-Za-z]+$/);
            const strokeWidth = Number(this.stroke["stroke-width"].substring(0, end));
            const svg = `<svg width="${box.x2 - box.x1 + strokeWidth}" 
            height="${box.y2 - box.y1}" 
            viewBox="${box.x1} ${box.y1} ${box.x2 + strokeWidth} ${box.y2 + strokeWidth}"
            xmlns="http://www.w3.org/2000/svg" style="vertical-align: text-top; ">
          <g id="svgGroup" stroke-linecap="round" stroke="#000" fill=${this.stroke["fill-color"]} style="fill:${this.stroke["fill-color"]}; fill-opacity:0;
            stroke:${this.stroke.stroke};
            stroke-width:${this.stroke["stroke-width"]};">
          </g>
      </svg>`;
            _div.innerHTML = svg;
            svgDom = _div.querySelector("svg");
            paths.forEach((path) => {
                svgpath += path.toSVG(2);
            });
            if (svgDom?.querySelector("g")) {
                svgDom.querySelector("g").innerHTML = svgpath;
            }
            return this.creator.create(svgDom);
        }
    }

    return SVGTextAnimate;

}));
//# sourceMappingURL=svg-text-animate.umd.js.map
