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
   * @param {Element} path
   * @param {Number} i Index of paths
   * @memberof SVGCreator
   */
  setPathAnimation(path, i) {
    const _options = this.options;
    const animateDom = document.createElementNS("http://www.w3.org/2000/svg",'animate')
    animateDom.setAttributeNS(null,'attributeName','stroke-dashoffset')
    animateDom.setAttributeNS(null,'to','0')
    animateDom.setAttributeNS(null,'dur', _options["duration"]+"ms")
    animateDom.setAttributeNS(null,'calcMode',_options["timing-function"])
    animateDom.setAttributeNS(null,'repeatCount',_options["iteration-count"])
    animateDom.setAttributeNS(null,'fill',_options["fill-mode"])
    switch (_options.mode) {
      case "sync": animateDom.setAttributeNS(null,'begin',"0ms"); break;
      case "delay": animateDom.setAttributeNS(null,'begin',_options.delay * (i+1)+"ms"); break;
      case "onebyone": animateDom.setAttributeNS(null,'begin',_options["duration"] * i + "ms"); break;
      default : animateDom.setAttributeNS(null,'begin',_options.mode); break;
    }
    const fillAnimate = animateDom.cloneNode()
    fillAnimate.setAttributeNS(null,'attributeName','fill-opacity')
    fillAnimate.setAttributeNS(null,'to','1')
    path.appendChild(animateDom)
    path.appendChild(fillAnimate)
  }

    /**
   * Function to format Options ,using default options
   *
   * @param {Object} options Options of creator
   * @memberof SVGCreator
   */
  formatOptions(options) {
    if(!options) return
    if(options["timing-function"]){
      options["timing-function"]="linear";
    }
    if(options["iteration-count"]=="infinite"){
      options["iteration-count"]="indefinite"
    }
    if(options["fill-mode"]){
      if(options["fill-mode"]=="none"){
        options["fill-mode"]="remove"
      }else{
        options["fill-mode"]="freeze"
      }
    }
    return options;
  }
}
