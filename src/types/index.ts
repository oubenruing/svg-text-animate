/**
 * Type definitions for svg-text-animate
 */

/**
 * Animation mode types
 */
export type AnimationMode = "sync" | "delay" | "onebyone" | string

/**
 * Creator type
 */
export type CreatorType = "css" | "svg"

/**
 * Animation options interface
 */
export interface AnimationOptions {
  /**
   * Duration of animation in milliseconds
   */
  duration?: number

  /**
   * CSS timing function or SVG calcMode
   */
  "timing-function"?: string

  /**
   * Number of iterations or 'infinite'/'indefinite'
   */
  "iteration-count"?: number | string

  /**
   * Animation direction
   */
  direction?: string

  /**
   * Fill mode
   */
  "fill-mode"?: string

  /**
   * Delay between animations in milliseconds
   */
  delay?: number

  /**
   * Animation mode: sync, delay, or onebyone
   */
  mode?: AnimationMode
}

/**
 * Stroke options interface
 */
export interface StrokeOptions {
  /**
   * Stroke color
   */
  stroke?: string

  /**
   * Stroke width with unit (e.g., '1px')
   */
  "stroke-width"?: string

  /**
   * Font size in pixels
   */
  "font-size"?: number

  /**
   * Fill color
   */
  "fill-color"?: string
}

/**
 * Bounding box interface
 */
export interface BoundingBox {
  x1: number
  y1: number
  x2: number
  y2: number
}

/**
 * Cache item for deep copy
 */
export interface CacheItem {
  original: any
  copy: any
}
