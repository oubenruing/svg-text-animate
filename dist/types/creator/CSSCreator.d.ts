import AnimationCreator from './AnimationCreator';
import type { AnimationOptions } from '../types';
/**
 * CSS-based animation creator
 * @extends AnimationCreator
 */
export default class CSSCreator extends AnimationCreator {
    /**
     * Creates an instance of CSSCreator.
     * @param options - Animation options
     */
    constructor(options?: AnimationOptions);
    /**
     * Function to set the SVG animation, using CSS animation
     */
    setSVGAnimation(): void;
    /**
     * Function to set the path animation, using CSS animation
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
