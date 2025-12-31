import * as opentype from "opentype.js";
import type { AnimationOptions, StrokeOptions, BoundingBox, CreatorType } from "./types";
export default class SVGTextAnimate {
    private loaded;
    private fontfile;
    private creator;
    private stroke;
    private font?;
    /**
     * Creates an instance of SVGTextAnimate.
     * @param fontfile - Path of fontfile
     * @param options - Animation options {duration,timing-function,iteration-count,direction,fill-mode,delay,mode}
     * @param stroke - Stroke options {stroke,stroke-width,font-size}
     * @param creator - The mode of animation, use CSSCreator by default.
     */
    constructor(fontfile: string, options?: AnimationOptions, stroke?: StrokeOptions, creator?: CreatorType);
    /**
     * Load a font file from a given path
     * Asynchronous method
     * @param fontfile - Path to font file
     * @returns A promise Object
     */
    setFont(fontfile?: string): Promise<boolean>;
    /**
     * Load a font file from an ArrayBuffer
     * @param buffer - ArrayBuffer containing font data
     * @returns Current instance
     */
    setFontFromBuffer(buffer: ArrayBuffer): this;
    /**
     * Set options of current instance
     * @param options - Animation options
     * @returns Current instance
     */
    setOptions(options?: AnimationOptions): this;
    /**
     * Set stroke of current instance
     * @param stroke - Stroke options
     * @returns Current instance
     */
    setStroke(stroke?: StrokeOptions): this;
    /**
     * Calculate the image boundary of a given path array
     * @param paths - Array of opentype.js Path objects
     * @returns Boundary {x1, y1, x2, y2}
     */
    getBounding(paths: opentype.Path[]): BoundingBox;
    /**
     * Generate svg animation from the stroked path of the given string
     * Clear selector and inserts it into the DOM of the selector
     * @param text - Text to animate
     * @param selector - CSS selector
     * @returns Current instance
     */
    create(text: string, selector: string): this | undefined;
    /**
     * Generate svg animation from the stroked path of the given string
     * And inserts it into the DOM of the selector
     * @param text - Text to animate
     * @param selector - CSS selector
     * @returns Current instance
     */
    add(text: string, selector: string): this | undefined;
    /**
     * Create SVG DOM element from text
     * @param text - Text to convert to SVG
     * @returns SVG DOM element
     */
    createSVGDom(text: string): SVGSVGElement;
}
export type { AnimationOptions, StrokeOptions, BoundingBox, CreatorType, AnimationMode, } from "./types";
