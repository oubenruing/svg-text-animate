declare module 'opentype.js' {
  export interface BoundingBox {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  }

  export class Path {
    commands: any[];
    fill: string | null;
    stroke: string | null;
    strokeWidth: number;
    
    getBoundingBox(): BoundingBox;
    toSVG(decimalPlaces?: number): string;
    toPathData(decimalPlaces?: number): string;
  }

  export interface Font {
    names: any;
    unitsPerEm: number;
    ascender: number;
    descender: number;
    
    getPaths(text: string, x: number, y: number, fontSize: number, options?: any): Path[];
    getPath(text: string, x: number, y: number, fontSize: number, options?: any): Path;
    draw(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, options?: any): void;
    drawPoints(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, options?: any): void;
    drawMetrics(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number, options?: any): void;
    stringToGlyphs(s: string): any[];
    charToGlyph(c: string): any;
    getKerningValue(leftGlyph: any, rightGlyph: any): number;
    getAdvanceWidth(text: string, fontSize: number, options?: any): number;
  }

  export function load(url: string, callback: (err: any, font?: Font) => void): void;
  export function loadSync(url: string): Font;
  export function parse(buffer: ArrayBuffer): Font;
}
