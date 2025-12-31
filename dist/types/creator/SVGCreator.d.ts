import AnimationCreator from './AnimationCreator';
import type { AnimationOptions } from '../types';
/**
 * SVG-based animation creator
 * @extends AnimationCreator
 */
export default class SVGCreator extends AnimationCreator {
    /**
     * Creates an instance of SVGCreator.
     * @param options - Animation options
     */
    constructor(options?: AnimationOptions);
    /**
     * Function to set the SVG animation, using SVG animate elements
     */
    setSVGAnimation(): void;
    /**
     * Function to set the path animation, using SVG animate elements
     * @param path - SVG path element
     * @param i - Index of paths
     */
    setPathAnimation(path: SVGPathElement, i: number): void;
    /**
     * Function to format Options, using default options
     * @param options - Options of creator
     * @returns Formatted options
     */
    formatOptions(options: AnimationOptions | Required<AnimationOptions>): AnimationOptions | Required<AnimationOptions>;
}
