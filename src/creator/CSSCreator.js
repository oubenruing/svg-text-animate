import AnimationCreator from "./AnimationCreator";
/**
 *
 *
 * @export
 * @class CSSCreator
 * @extends {AnimationCreator}
 */
export default class CSSCreator extends AnimationCreator {
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
    let style = this.svgDom.querySelector("style");
    if (style != null) {
      style.innerHTML = "";
    } else {
      style = document.createElement("style");
    }
    style.innerHTML = "@keyframes STAdraw{to{stroke-dashoffset:0;fill-opacity:1;}}";
    this.svgDom.appendChild(style);
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
        animation = `animation: STAdraw ${_options["duration"]}ms ${
          _options["timing-function"]
        } ${_options.delay * i}ms ${_options["fill-mode"]} ${
          _options["direction"]
        } ${_options["iteration-count"]};`;
        break;
      case "onebyone":
        animation = `animation: STAdraw ${_options["duration"]}ms ${
          _options["timing-function"]
        } ${_options["duration"] * i}ms ${_options["fill-mode"]} ${
          _options["direction"]
        } ${_options["iteration-count"]};`;
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
