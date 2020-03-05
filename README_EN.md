# svg-text-animate.js

[[中文](https://github.com/oubenruing/svg-text-animate/blob/master/README.md)]
[[English](https://github.com/oubenruing/svg-text-animate/blob/master/README_EN.md)]

Svg-text-animate is a JavaScript library for convert text to SVG stroke animations in the browser.<br>

![Alt text](https://oubenruing.github.io/svg-text-animate/demo/title.svg)<br>
![Alt text](https://oubenruing.github.io/svg-text-animate/demo/hello.svg)<br>
![Alt text](https://oubenruing.github.io/svg-text-animate/demo/top.svg)<br>

See [svg-text-animate](https://oubenruing.github.io/svg-text-animate/index_en.html) for a live demo.

---
## Usage

### Download

Download latest files from [releases](https://github.com/oubenruing/svg-text-animate/releases) These are compiled.<br>
Using svg-text-animate.js or minimum svg-text-animate.min.js like this

    <script src="YOURPATH/svg-text-animate.js"></script>
    or
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

---
## constructor
Creates an instance of SVGTextAnimate.

`SVGTextAnimate(fontfile, options, stroke, cretor)`

  * @param {String} `Required` fontfile: Path of font file with WOFF, OTF, TTF (both with TrueType glyf and PostScript cff outlines)
  * @param {Object} `Required` options: {duration,timing-function,iteration-count,direction,fill-mode,delay,mode}
  * @param {Object} `Required` stroke: {stroke,stroke-width,font-size}
  * @param {String} `Optional` creator: The mode of animation, use CSSCreator by default.

***Font-size moved from ‘options’ to ‘stroke’ in version 1.2.0***

For example:

```
var opensans = new SVGTextAnimate("https://cdn.jsdelivr.net/gh/oubenruing/svg-text-animate@latest/docs/fonts/OpenSans-Regular-webfont.woff", {
      "duration": 300,
      "direction": "normal",
      "fill-mode": "forwards",
      "delay": 150,
      "mode": "delay"
    }, {
      "stroke": "#005792",
      "stroke-width": "2px",
      "font-size": 55
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
mode|String|sync|"**sync**":All symbols appear at the same time; <br>"**onebyone**":a symbol appears after the last symbol animation;<br>"**delay**":a symbol appears n milliseconds later when the last symbol starts drawing.(The value of n is taken from the next option)
delay|Number|0|Only work with mode:"**delay**"

### stroke
An Object for controlling stroke

Name|Type|Default value|Description
---|:--:|:--:|---
stroke|String|#000000|The hex color of stroke
stroke-width|String|1px|The width of stroke
font-size|Number|72|Output font size.

### creator
The mode of animation.

Param|Description
---|---
css | (default) Using CSSCreator. Create a CSS style SVG animation.(Using \<style\> tag and @keyframes).
svg | Using SVGCreator. Create a SMIL SVG animation.(Using \<animate\> tag).<br>In this case：<br>1.The option 'timing-function' always works in 'linear' mode.<br>2.The option 'fill-mode' only works in 'forwards' mode or 'none' mode.<br>3.The option 'direction' always works in 'normal' mode.<br><br>The 'svg' mode can be used in the scenario where CSS is not supported



---
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

### setFontFromBuffer()
Load a font file from an ArrayBuffer<br>
Each font just needs to be loaded only once.<br>
returns current instance


### setOptions(options)

set an Object for controlling animation, same as [options](#options)<br>
returns current instance



### setStroke(stroke)

set an Object for controlling animation, same as [stroke](#stroke)
returns current instance

### create(text,selector)  add(text,selector)

`create` a svg animation from the given string. Clear the selector first, then insert SVG into the DOM of delector.
`add`(v1.2.0) a svg animation from the given string and inserts it into the DOM of the selector.

returns current instance


Name|Type|Description
---|:--:|---
text|String|The text you want to animate
selector|String|The DOM selector you want to insert into

```
    opensans.create("svg-text-animate", "#name");

    opensans.setOptions({
      "duration": 500,
      "timing-function": "linear",
      "direction": "normal",
      "fill-mode": "forwards",
      "delay": 50,
      "mode": "sync"
    }).setStroke({
      "stroke": "white",
      "stroke-width": "2px",
      "font-size": 23
    }).create("Try it", ".button");
```
---
## Special fonts

  * Fonts with a large number of characters, such as chinese.
  * Fonts exported from icons, for example the fonts download from [fontawesom](https://fontawesome.com/).

In the first case, I recommend compressing the font first. Try [font-spider](https://github.com/aui/font-spider) or other font compress tools;<br>

In the second case, you can use like this

```
    fontawesome.setOptions({
      "duration": 2000,
      "timing-function": "linear",
      "direction": "alternate",
      "delay": 500,
      "iteration-count": "infinite",
      "mode": "sync"
    }).setStroke({
      "stroke": "white",
      "stroke-width": "1px",
      "font-size": 22
    }).create(String.fromCharCode(0xf581), "#symbols")
      .create(String.fromCharCode(0xf164), "#symbols2");

      //you can find hex code on the website where you downloaded the iconfont.
      //Using String.fromCharCode(hexcode) as "create" method`s first parameter.
```


---
## Thanks 

[opentype.js](https://github.com/opentypejs/opentype.js) Read and write OpenType fonts using JavaScript. <br>
[fontawesom](https://fontawesome.com/) The iconic SVG, font, and CSS toolkit. <br>
[font-spider](https://github.com/aui/font-spider) Smart webfont compression and format conversion tool. 

---
(c) oubenruing 2019 | MIT License
