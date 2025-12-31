import * as opentype from "opentype.js"
import CSSCreator from "./creator/CSSCreator"
import SVGCreator from "./creator/SVGCreator"
import AnimationCreator from "./creator/AnimationCreator"
import Tools from "./tools/tools"
import { DEFAULT_STROKE } from "./config/config"
import type { AnimationOptions, StrokeOptions, BoundingBox, CreatorType } from "./types"

export default class SVGTextAnimate {
  private loaded: boolean = false
  private fontfile: string
  private creator: AnimationCreator
  private stroke: Required<StrokeOptions>
  private font?: opentype.Font

  /**
   * Creates an instance of SVGTextAnimate.
   * @param fontfile - Path of fontfile
   * @param options - Animation options {duration,timing-function,iteration-count,direction,fill-mode,delay,mode}
   * @param stroke - Stroke options {stroke,stroke-width,font-size}
   * @param creator - The mode of animation, use CSSCreator by default.
   */
  constructor(
    fontfile: string,
    options?: AnimationOptions,
    stroke?: StrokeOptions,
    creator?: CreatorType
  ) {
    this.fontfile = fontfile

    switch (creator) {
      case "svg":
        this.creator = new SVGCreator(options)
        break
      default:
        this.creator = new CSSCreator(options)
    }

    this.stroke = Tools.deepCopy(DEFAULT_STROKE)
    this.setStroke(stroke)
  }

  /**
   * Load a font file from a given path
   * Asynchronous method
   * @param fontfile - Path to font file
   * @returns A promise Object
   */
  setFont(fontfile?: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      opentype.load(fontfile || this.fontfile, (err: any, openfont?: opentype.Font) => {
        if (err) {
          console.error("font could not be loaded :(")
          reject(err)
        } else {
          this.font = openfont
          this.loaded = true
          resolve(true)
        }
      })
    }).catch((reason) => {
      console.log("catch:", reason)
      return false
    })
  }

  /**
   * Load a font file from an ArrayBuffer
   * @param buffer - ArrayBuffer containing font data
   * @returns Current instance
   */
  setFontFromBuffer(buffer: ArrayBuffer): this {
    this.font = opentype.parse(buffer)
    this.loaded = true
    return this
  }

  /**
   * Set options of current instance
   * @param options - Animation options
   * @returns Current instance
   */
  setOptions(options?: AnimationOptions): this {
    this.creator.setOptions(options)
    return this
  }

  /**
   * Set stroke of current instance
   * @param stroke - Stroke options
   * @returns Current instance
   */
  setStroke(stroke?: StrokeOptions): this {
    if (stroke) {
      Object.assign(this.stroke, stroke)
    }
    return this
  }

  /**
   * Calculate the image boundary of a given path array
   * @param paths - Array of opentype.js Path objects
   * @returns Boundary {x1, y1, x2, y2}
   */
  getBounding(paths: opentype.Path[]): BoundingBox {
    if (paths.length === 0) {
      console.error("path does not exist")
      return { x1: 0, y1: 0, x2: 0, y2: 0 }
    }

    const x2 = paths[paths.length - 1].getBoundingBox().x2
    const y2 = paths
      .reduce((r, c) => {
        return r.getBoundingBox().y2 >= c.getBoundingBox().y2 ? r : c
      })
      .getBoundingBox().y2

    return { x1: 0, y1: 0, x2, y2 }
  }

  /**
   * Generate svg animation from the stroked path of the given string
   * Clear selector and inserts it into the DOM of the selector
   * @param text - Text to animate
   * @param selector - CSS selector
   * @returns Current instance
   */
  create(text: string, selector: string): this | undefined {
    if (!this.loaded) {
      console.error("Fontfile does not loaded")
      return
    }

    const fatherdom = document.querySelector(selector)
    if (!fatherdom) {
      console.error("no such fatherdom")
      return
    }

    const svgDom = this.createSVGDom(text)
    fatherdom.innerHTML = ""
    fatherdom.appendChild(svgDom)
    return this
  }

  /**
   * Generate svg animation from the stroked path of the given string
   * And inserts it into the DOM of the selector
   * @param text - Text to animate
   * @param selector - CSS selector
   * @returns Current instance
   */
  add(text: string, selector: string): this | undefined {
    if (!this.loaded) {
      console.error("Fontfile does not loaded")
      return
    }

    const fatherdom = document.querySelector(selector)
    if (fatherdom == null) {
      console.error("no such fatherdom")
      return
    }

    const svgDom = this.createSVGDom(text)
    fatherdom.appendChild(svgDom)
    return this
  }

  /**
   * Create SVG DOM element from text
   * @param text - Text to convert to SVG
   * @returns SVG DOM element
   */
  createSVGDom(text: string): SVGSVGElement {
    if (!this.font) {
      throw new Error("Font not loaded")
    }

    let svgpath = ""
    const _div = document.createElement("div")
    const paths = this.font.getPaths(text, 0, this.stroke["font-size"], this.stroke["font-size"])
    const box = this.getBounding(paths)

    // Remove the unit
    const end = this.stroke["stroke-width"].search(/[A-Za-z]+$/)
    const strokeWidth = Number(this.stroke["stroke-width"].substring(0, end))

    const svg = `<svg width="${box.x2 - box.x1 + strokeWidth}" 
          height="${box.y2 - box.y1}" 
          viewBox="${box.x1} ${box.y1} ${box.x2 + strokeWidth} ${box.y2 + strokeWidth}"
          xmlns="http://www.w3.org/2000/svg" style="vertical-align: text-top; ">
        <g id="svgGroup" stroke-linecap="round" stroke="#000" fill=${
          this.stroke["fill-color"]
        } style="fill:${this.stroke["fill-color"]}; fill-opacity:0;
          stroke:${this.stroke.stroke};
          stroke-width:${this.stroke["stroke-width"]};">
        </g>
    </svg>`

    _div.innerHTML = svg
    const svgDom = _div.querySelector("svg")

    if (!svgDom) {
      throw new Error("Failed to create SVG element")
    }

    paths.forEach((path: opentype.Path) => {
      svgpath += path.toSVG(2)
    })

    const gElement = svgDom.querySelector("g")
    if (gElement) {
      gElement.innerHTML = svgpath
    }

    return this.creator.create(svgDom)
  }
}

// Export types for TypeScript users
export type {
  AnimationOptions,
  StrokeOptions,
  BoundingBox,
  CreatorType,
  AnimationMode,
} from "./types"
