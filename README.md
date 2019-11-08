# svg-text-animate.js
Svg-text-animate is a JavaScript library for convert text to SVG stroke animations in the browser.
See [svg-text-animate](https://oubenruing.github.io/svg-text-animate/) for a live demo.

## Usage

### Directly

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
    
### Using via a CDN

To use via a CDN, include the following code in your html:

    <script src="https://cdn.jsdelivr.net/gh/oubenruing/svg-text-animate@latest/dist/svg-text-animate.min.js"></script>
