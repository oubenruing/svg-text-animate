import type { AnimationOptions } from '../types';
/**
 * Abstract class for animation creators
 * @abstract
 */
export default abstract class AnimationCreator {
    protected options: Required<AnimationOptions>;
    protected svgDom: SVGSVGElement | null;
    protected paths: NodeListOf<SVGPathElement> | null;
    /**
     * Creates an instance of AnimationCreator.
     * @param options - Animation options
     */
    constructor(options?: AnimationOptions);
    /**
     * Set the svgDom
     * @param svgDom - SVG DOM element
     */
    setSVGDom(svgDom: SVGSVGElement): void;
    /**
     * Set animation options
     * @param options - Animation options
     * @returns Current instance
     */
    setOptions(options?: AnimationOptions): this;
    /**
     * Animate each path
     */
    setAllPathsAnimation(): void;
    /**
     * Set the path stroke
     * @param path - SVG path element
     */
    setPathStroke(path: SVGPathElement): void;
    /**
     * Function to set the SVG animation
     * Must be implemented in the inheritance class
     * @abstract
     */
    abstract setSVGAnimation(): void;
    /**
     * Function to set the path animation
     * Must be implemented in the inheritance class
     * @abstract
     * @param path - SVG path element
     * @param i - Index of paths
     */
    abstract setPathAnimation(path: SVGPathElement, i: number): void;
    /**
     * Function to format Options, using default options
     * Must be implemented in the inheritance class
     * @abstract
     * @param options - Options to format
     * @returns Formatted options
     */
    abstract formatOptions(options: AnimationOptions | Required<AnimationOptions>): AnimationOptions | Required<AnimationOptions>;
    /**
     * Create animated SVG
     * @param svgDom - SVG DOM element
     * @returns Animated svgDom
     */
    create(svgDom: SVGSVGElement): SVGSVGElement;
}
