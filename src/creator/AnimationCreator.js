import { DEFAULT_OPTIONS } from "../config/config.js";
import Tools from "../tools/tools.js";

/**
 *
 *
 * @export
 * @class AnimationCreator
 * @Description Abstract class
 */
export default class AnimationCreator {
  /**
   *Creates an instance of AnimationCreator.
   * @param {Object} options
   * @memberof AnimationCreator
   */
  constructor(options) {
    this.options = Tools.deepCopy(this.formatOptions(DEFAULT_OPTIONS));
    this.svgDom = null;
    this.setOptions(this.formatOptions(options));
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
    Object.assign(this.options, options);
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
    const stroke = `stroke-dasharray:${pathLength - 1} ${pathLength +
      1};stroke-dashoffset:${pathLength};`;
    path.style.cssText += stroke;
  }

  /**
   * Function to set the SVG animation , you need to implement in the inheritance class
   *
   * @memberof AnimationCreator
   */
  setSVGAnimation() {
    console.error(
      this.constructor.name + " do not have setSVGAnimation method."
    );
  }

  /**
   * Function to set the path animation , you need to implement in the inheritance class
   *
   * @param {Dom} path
   * @param {num} i index of paths
   * @memberof AnimationCreator
   */
  setPathAnimation(path, i) {
    console.error(
      this.constructor.name + " do not have setPathAnimation method."
    );
  }

  /**
   * Function to format Options ,using default options
   *
   * @memberof AnimationCreator
   */
  formatOptions(options) {
    console.error(
      this.constructor.name + " do not have setPathAnimation method."
    );
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
