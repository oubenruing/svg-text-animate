# svg-text-animate.js

[[中文](https://github.com/oubenruing/svg-text-animate/blob/master/README_CN.md)]
[[English](https://github.com/oubenruing/svg-text-animate/blob/master/README_CN.md)]

Svg-text-animate is a JavaScript library for convert text to SVG stroke animations in the browser.<br>
See [svg-text-animate](https://oubenruing.github.io/svg-text-animate/) for a live demo.

## Usage

### Download

Download latest files from [releases](https://github.com/oubenruing/svg-text-animate/releases) These are compiled.<br>
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

  * @param {String} fontfile Path of font file with WOFF, OTF, TTF (both with TrueType glyf and PostScript cff outlines)
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
An Object for controlling animation

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
An Object for controlling stroke

Name|Type|Default value|Description
---|:--:|:--:|---
stroke|String|#000000|The hex color of stroke
stroke-width|String|1px|The width of stroke

## Methods

### setfont()
An asynchronous method for loading font files passed in from the constructor.<br>
This method will returns a Promise. <br>
Each font just needs to be loaded only once.<br>

```
  await opensans.setFont();
```
or
```
  opensans.setFont().then();
```

### setOptions(options)

set an Object for controlling animation, same as [options](#options)<br>
returns *this*

### setStroke(stroke)

set an Object for controlling animation, same as [stroke](#stroke)
returns *this*

### create(text,selector)

create a svg animation from the given string and inserts it into the DOM of the selector.
returns *this*

Name|Type|Default value|Description
---|:--:|:--:|---
text|String| |The text you want to animate
selector|String| |The DOM selector you want to insert into

```
    opensans.create("svg-text-animate", "#name");

    opensans.setOptions({
      "duration": 500,
      "timing-function": "linear",
      "direction": "normal",
      "fill-mode": "forwards",
      "delay": 50,
      "mode": "sync",
      "font-size": 23
    }).setStroke({
      "stroke": "white",
      "stroke-width": "2px"
    }).create("Try it", ".button");
```

## Thanks 

[opentype.js]([#stroke](https://github.com/opentypejs/opentype.js)) Read and write OpenType fonts using JavaScript. 

---
(c) oubenruing 2019 | MIT License