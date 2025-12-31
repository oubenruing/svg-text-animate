import { DEFAULT_OPTIONS } from '../config/config';
import Tools from '../tools/tools';
import type { AnimationOptions } from '../types';

/**
 * Abstract class for animation creators
 * @abstract
 */
export default abstract class AnimationCreator {
  protected options: Required<AnimationOptions>;
  protected svgDom: SVGSVGElement | null = null;
  protected paths: NodeListOf<SVGPathElement> | null = null;

  /**
   * Creates an instance of AnimationCreator.
   * @param options - Animation options
   */
  constructor(options?: AnimationOptions) {
    this.options = Tools.deepCopy(this.formatOptions(DEFAULT_OPTIONS)) as Required<AnimationOptions>;
    this.setOptions(options);
  }

  /**
   * Set the svgDom
   * @param svgDom - SVG DOM element
   */
  setSVGDom(svgDom: SVGSVGElement): void {
    this.svgDom = svgDom;
    this.paths = svgDom.querySelectorAll('path');
  }

  /**
   * Set animation options
   * @param options - Animation options
   * @returns Current instance
   */
  setOptions(options?: AnimationOptions): this {
    if (options) {
      Object.assign(this.options, this.formatOptions(options));
    }
    return this;
  }

  /**
   * Animate each path
   */
  setAllPathsAnimation(): void {
    if (!this.paths) return;
    
    this.paths.forEach((path, i) => {
      this.setPathStroke(path);
      this.setPathAnimation(path, i);
    });
  }

  /**
   * Set the path stroke
   * @param path - SVG path element
   */
  setPathStroke(path: SVGPathElement): void {
    const pathLength = Math.ceil(path.getTotalLength());
    const stroke = `stroke-dasharray:${pathLength - 1} ${pathLength + 1};stroke-dashoffset:${pathLength};`;
    path.style.cssText += stroke;
  }

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
  create(svgDom: SVGSVGElement): SVGSVGElement {
    this.setSVGDom(svgDom);
    this.setSVGAnimation();
    this.setAllPathsAnimation();
    return svgDom;
  }
}
