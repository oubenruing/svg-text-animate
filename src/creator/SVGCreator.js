import AnimationCreator from "./AnimationCreator";
/**
 *
 *
 * @export
 * @class SVGCreator
 * @extends {AnimationCreator}
 */
export default class SVGCreator extends AnimationCreator {
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
  setSVGAnimation() {
    
  }

  /**
   * Function to set the path animation , using CSS animation
   *
   * @param {DOM} path
   * @param {Number} i Index of paths
   * @memberof SVGCreator
   */
  setPathAnimation(path, i) {
    const _options = this.options;
    let animation = "<animate"
    animation+=" attributeName="+"stroke-dashoffset";
    animation+=" to="+"0"
    animation+=" dur="+_options["duration"]+"ms"
    animation+=" calcMode="+_options["timing-function"]
    animation+=" repeatCount="+ _options["iteration-count"]
    animation+=" fill=" + _options["fill-mode"]
    switch (_options.mode) {
      case "sync": animation+=" begin="+ "0ms"; break;
      case "delay": animation+=" begin="+ _options.delay * i+"ms"; break;
      case "onebyone": animation+=" begin="+ _options["duration"] * i + "ms"; break;
      default :animation+=" begin="+ _options.mode; break;
    }
    animation+=" />"
    path.innerHTML=animation;
  }

    /**
   * Function to format Options ,using default options
   *
   * @param {Object} options Options of creator
   * @memberof SVGCreator
   */
  formatOptions(options) {
    if(options["timing-function"]){
      options["timing-function"]="linear";
    }
    debugger;
    if(!options["fill-mode"] || options["fill-mode"]=="forwards"){
      options["fill-mode"]="freeze"
    }else{
      options["fill-mode"]="remove"
    }
    return options;
  }
}
