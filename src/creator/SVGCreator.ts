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
  constructor(options?: AnimationOptions) {
    super(options);
  }

  /**
   * Function to set the SVG animation, using SVG animate elements
   */
  setSVGAnimation(): void {
    // No additional SVG-level animation needed
  }

  /**
   * Function to set the path animation, using SVG animate elements
   * @param path - SVG path element
   * @param i - Index of paths
   */
  setPathAnimation(path: SVGPathElement, i: number): void {
    const _options = this.options;
    const animateDom = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    
    animateDom.setAttributeNS(null, 'attributeName', 'stroke-dashoffset');
    animateDom.setAttributeNS(null, 'to', '0');
    animateDom.setAttributeNS(null, 'dur', _options['duration'] + 'ms');
    animateDom.setAttributeNS(null, 'calcMode', _options['timing-function']);
    animateDom.setAttributeNS(null, 'repeatCount', String(_options['iteration-count']));
    animateDom.setAttributeNS(null, 'fill', _options['fill-mode']);
    
    switch (_options.mode) {
      case 'sync':
        animateDom.setAttributeNS(null, 'begin', '0ms');
        break;
      case 'delay':
        animateDom.setAttributeNS(null, 'begin', _options.delay * (i + 1) + 'ms');
        break;
      case 'onebyone':
        animateDom.setAttributeNS(null, 'begin', _options['duration'] * i + 'ms');
        break;
      default:
        animateDom.setAttributeNS(null, 'begin', _options.mode);
        break;
    }
    
    const fillAnimate = animateDom.cloneNode() as SVGAnimateElement;
    fillAnimate.setAttributeNS(null, 'attributeName', 'fill-opacity');
    fillAnimate.setAttributeNS(null, 'to', '1');
    
    path.appendChild(animateDom);
    path.appendChild(fillAnimate);
  }

  /**
   * Function to format Options, using default options
   * @param options - Options of creator
   * @returns Formatted options
   */
  formatOptions(options: AnimationOptions | Required<AnimationOptions>): AnimationOptions | Required<AnimationOptions> {
    if (!options) return options;
    
    const formatted = { ...options };
    
    if (formatted['timing-function']) {
      formatted['timing-function'] = 'linear';
    }
    
    if (formatted['iteration-count'] === 'infinite') {
      formatted['iteration-count'] = 'indefinite';
    }
    
    if (formatted['fill-mode']) {
      if (formatted['fill-mode'] === 'none') {
        formatted['fill-mode'] = 'remove';
      } else {
        formatted['fill-mode'] = 'freeze';
      }
    }
    
    return formatted;
  }
}
