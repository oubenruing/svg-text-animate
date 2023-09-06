import { DEFAULT_OPTIONS } from "../config/config.js"

/**
 *
 *
 * @export
 * @class AnimationCreator
 * @Description Abstract class
 */
export default class AnimationCreator {
  options: any
  svgDom: SVGElement | null
  paths: any

  /**
   *Creates an instance of AnimationCreator.
   * @param {Object} options
   * @memberof AnimationCreator
   */
  constructor(options: any) {
    this.options = this.formatOptions(DEFAULT_OPTIONS)
    this.svgDom = null
    this.setOptions(options)
  }

  /**
   * Set the svgDom
   *
   * @param {DOM} svgDom
   * @memberof AnimationCreator
   */
  setSVGDom(svgDom: SVGElement) {
    this.svgDom = svgDom
    this.paths = svgDom.querySelectorAll("path")
  }

  /**
   *
   *
   * @param {Object} options
   * @returns {AnimationCreator} current instance
   * @memberof AnimationCreator
   */
  setOptions(options: any) {
    Object.assign(this.options, this.formatOptions(options))
    return this
  }

  /**
   * Animate each path
   *
   * @memberof AnimationCreator
   */
  setAllPathsAnimation() {
    this.paths.forEach((path: any, i: any) => {
      this.setPathStroke(path)
      this.setPathAnimation(path, i)
    })
  }

  /**
   * Set the path stroke
   *
   * @param {DOM} path
   * @memberof AnimationCreator
   */

  setPathStroke(path: {
    getTotalLength: () => number
    style: { cssText: string }
  }) {
    const pathLength = Math.ceil(path.getTotalLength())
    const stroke = `stroke-dasharray:${pathLength - 1} ${
      pathLength + 1
    };stroke-dashoffset:${pathLength};`
    path.style.cssText += stroke
  }

  /**
   * Function to set the SVG animation , you need to implement in the inheritance class
   *
   * @memberof AnimationCreator
   */
  setSVGAnimation() {
    console.error(
      this.constructor.name + " do not have setSVGAnimation method."
    )
  }

  /**
   * Function to set the path animation , you need to implement in the inheritance class
   *
   * @param {Dom} path
   * @param {num} i index of paths
   * @memberof AnimationCreator
   */
  setPathAnimation(path: any, i: any) {
    console.error(
      this.constructor.name + " do not have setPathAnimation method."
    )
  }

  /**
   * Function to format Options ,using default options
   *
   * @memberof AnimationCreator
   */
  formatOptions(options: {
    duration: number
    "timing-function": string
    "iteration-count": number
    direction: string
    "fill-mode": string
    delay: number
    mode: string
  }) {
    console.error(
      this.constructor.name + " do not have setPathAnimation method."
    )
  }

  /**
   *
   *
   * @param {DOM} svgDom
   * @returns {DOM} Animated svgDom
   * @memberof AnimationCreator
   */

  create(svgDom: any) {
    this.setSVGDom(svgDom)
    this.setSVGAnimation()
    this.setAllPathsAnimation()
    return svgDom
  }
}
