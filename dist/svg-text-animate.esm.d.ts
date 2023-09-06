/**
 * @fileOverview Svg-text-animate is a JavaScript library for convert text to SVG stroke animations in the browser.
 * @author oubenruing
 * @version 1.3.2
 */
declare class SVGTextAnimate {
    fontfile: any;
    loaded: boolean;
    creator: any;
    stroke: any;
    fatherdom: null;
    font: any;
    /**
     *Creates an instance of SVGTextAnimate.
     * @param {String} fontfile Path of fontfile
     * @param {Object} options  {duration,timing-function,iteration-count,direction,fill-mode,delay,mode}
     * @param {Object} stroke   {stroke,stroke-width,font-size}
     * @param {String} creator  The mode of animation, use CSSCreator by default.
     *
     */
    constructor(fontfile: any, options: any, stroke: any, creator: any);
    /**
     * Load a font file from a given path
     * Asynchronous method
     *
     * @param {String} fontfile
     * @returns {Promise} A promise Object
     *
     */
    setFont(fontfile: any): Promise<unknown>;
    /**
     * Load a font file from an ArrayBuffer
     *
     *
     * @param {ArrayBuffer} buffer
     * @returns {SVGTextAnimate} current instance
     */
    setFontFromBuffer(buffer: any): this;
    /**
     * set options of current instance
     *
     * @param {Object} options
     * @returns {SVGTextAnimate} current instance
     *
     */
    setOptions(options: any): this;
    /**
     * set stroke of current instance
     *
     * @param {Object} stroke
     * @returns {SVGTextAnimate} current instance
     *
     */
    setStroke(stroke: any): this;
    /**
     * Calculate the image boundary of a given path array
     *
     * @param {Array<Path>} paths
     * @returns {Object} boundary{x1, y1, x2, y2}
     * @memberof SVGTextAnimate
     *
     */
    getBounding(paths: any[]): {
        x1: number;
        y1: number;
        x2: any;
        y2: any;
    };
    /**
     *  Generate svg animation from the stroked path of the given string
     *  clear selector and inserts it into the DOM of the selector
     *
     * @param {String} text
     * @param {String} selector
     * @returns {SVGTextAnimate} current instance
     *
     */
    create(text: any, selector: any): this | undefined;
    /**
     *
     * Generate svg animation from the stroked path of the given string
     *  and inserts it into the DOM of the selector
     *
     * @param {String} text
     * @param {String} selector
     * @returns {SVGTextAnimate} current instance
     */
    add(text: any, selector: any): this | undefined;
    /**
     *
     *
     * @param {Sting} text
     * @returns {DOM} svgDom
     */
    createSVGDom(text: any): any;
}

export { SVGTextAnimate as default };
