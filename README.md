# svg-text-animate.js
Svg-text-animate is a JavaScript library for convert text to SVG stroke animations in the browser.
See [svg-text-animate](https://oubenruing.github.io/svg-text-animate/) for a live demo.

## Usage

### Download

Download latest files from [releases](https://github.com/oubenruing/svg-text-animate/releases) These are compiled.
Using svg-text-animate.js or minimum svg-text-animate.min.js like this

    <script src="YOURPATH/svg-text-animate.js"></script>
    <script src="YOURPATH/svg-text-animate.min.js"></script>
    <script>
      var fontawesome = new SVGTextAnimate("YOUR FONT FILE");
    </script>
or using svg-text-animate.module.js by ES6-style
    
    <script type="module">
      import SVGTextAnimate from "YOURPATH/svg-text-animate.module.js";
      var fontawesome = new SVGTextAnimate("YOUR FONT FILE");
    </script>
    
### CDN

To use via a CDN, include the following code in your html:

    <script src="https://cdn.jsdelivr.net/gh/oubenruing/svg-text-animate@latest/dist/svg-text-animate.min.js"></script>

## constructor
Creates an instance of SVGTextAnimate.

`SVGTextAnimate(fontfile, options, stroke)`

  * @param {String} fontfile Path of font file
  * @param {Object} options  {duration,timing-function,iteration-count,direction,fill-mode,font-size,delay,mode}
  * @param {Object} stroke   {stroke,stroke-width}

For example:

```
var opensans = new SVGTextAnimate("https://cdn.jsdelivr.net/gh/oubenruing/svg-text-animate@latest/docs/fonts/OpenSans-Regular-webfont.woff", {
      "duration": 300,
      "direction": "normal",
      "fill-mode": "forwards",
      "delay": 150,
      "mode": "delay",
      "font-size": 55
    }, {
      "stroke": "#005792",
      "stroke-width": "2px"
    });
```

### options
A Object for controlling animation

Name|Type|Default value|Description
---|:--:|:--:|---
duration|Number|1000|this option sets the length of time that an animation takes to complete one cycle in **milliseconds**.
timing-function|String|linear|Same as the animation-timing-function CSS property.
iteration-count|Number|1|Same as the animation-iteration-count CSS property.
direction|String|normal|Same as the animation-direction CSS property.
fill-mode|String|forwards|Same as the animation-fill-mode CSS property.
font-size|Number|72|Output font size.
mode|String|sync|"**sync**":All symbols appear at the same time; <br>"**onebyone**":a symbol appears after the last symbol animation;<br>"**delay**":a symbol appears n milliseconds later when the last symbol starts drawing.(The value of n is taken from the next option)
delay|Number|0|Only work with mode:"**delay**"

### stroke
A Object for controlling stroke

Name|Type|Default value|Description
---|:--:|:--:|---
stroke|String|#000000|The hex color of stroke
stroke-width|String|1px|The width of stroke with a unit

## Methods

### setfont()
An Asynchronous method to load a font file from a given path.<br>
This method will returns a Promise. <br>
Using *.then()* after *setfont()* or using *await*;<br>
Each font just needs to be loaded only once.<br>