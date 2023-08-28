# svg-text-animate.js

[[中文](https://github.com/oubenruing/svg-text-animate/blob/master/README_CN.md)]
[[English](https://github.com/oubenruing/svg-text-animate/blob/master/README.md)]

Svg-text-animate 一个在浏览器环境中将输入文本转化为描边动画的工具<br>
![Alt text](https://oubenruing.github.io/svg-text-animate/demo/title.svg)<br>
![Alt text](https://oubenruing.github.io/svg-text-animate/demo/hello.svg)<br>
![Alt text](https://oubenruing.github.io/svg-text-animate/demo/top.svg)<br>


demo [svg-text-animate](https://oubenruing.github.io/svg-text-animate/)<br>
在线生成工具 [svg-tool](https://oubenruing.github.io/svg-text-animate/tool.html)


## 使用方法

### NPM
<br>

    npm i svg-text-animate

### CDN


    <script src="https://cdn.jsdelivr.net/gh/oubenruing/svg-text-animate@latest/dist/svg-text-animate.min.js"></script>

### Demo

```
    import SVGTextAnimate from 'svt-text-animate;
    
    const opensans = new SVGTextAnimate("https://cdn.jsdelivr.net/gh/oubenruing/svg-text-animate@latest/docs/fonts/OpenSans-Regular-webfont.woff", {
      "duration": 300,
      "direction": "normal",
      "fill-mode": "forwards",
      "delay": 150,
      "mode": "delay"
    }, {
      "stroke": "#005792",
      "stroke-width": "2px",
      "font-size": 55,
      "fill-color":"white"
    });

    await opensans.setFont();
    
    opensans.create("svg-text-animate", "#name");
```

---
## 构造函数
创建 SVGTextAnimate实例

`SVGTextAnimate(fontfile, options, stroke, creator)`

  * @param {String} `必填` 字体文件路径，支持格式：WOFF, OTF, TTF (包含TrueType glyf 和 PostScript cff outlines)
  * @param {Object} `必填` options: {duration,timing-function,iteration-count,direction,fill-mode,delay, mode}
  * @param {Object} `必填` stroke:  {stroke,stroke-width,font-size}
  * @param {String} `可选` creator: 动画生成器，默认使用 CSSCreator 生成css动画.

  ***font-size 在1.2.0版本中 从 options 移至 stroke***

### options
控制动画效果的对象

属性名|类型|默认值|说明
---|:--:|:--:|---
duration|Number|1000|单个文字动画时长 单位：**毫秒**.
timing-function|String|linear|同CSS属性animation-timing-function.
iteration-count|Number|1|同CSS属性animation-iteration-count.
direction|String|normal|同CSS属性animation-direction.
fill-mode|String|forwards|同CSS属性animation-fill-mode.
mode|String|sync|"**sync**":所有文字同时绘制; <br>"**onebyone**":一个接一个绘制;<br>"**delay**":一个字符绘制之后延迟n秒绘制下一个，**n**取自下一个参数delay
delay|Number|0|:仅在mode为**delay**模式下生效，单位毫秒

### stroke
控制画笔的对象

属性名|类型|默认值|说明
---|:--:|:--:|---
stroke|String|#000000|十六进制颜色值的描边颜色
stroke-width|String|1px|描边宽度
font-size|Number|72|输出字符的大小.
fill-color|String|transparent|文字填充颜色.

### creator
动画创建器

参数|说明
---|---
css | (默认) 使用 CSSCreator. 创建CSS风格的svg动画.(使用 \<style\> 标签 和 @keyframes).
svg | 使用 SVGCreator. 创建 SMIL 风格的SVG动画.(使用 \<animate\> 标签).<br>这种情况下：<br>1.选项中的 'timing-function'总是在'linear'模式下工作,只能使用线性动画。<br>2.选项中的'fill-mode'只能使用 'forwards' 或 'none'模式。<br>3.选项中的'direction'总是在'normal' 模式下工作，不可变.<br><br>**'svg'模式生成的svg图片可用在不支持css的场景中，例如使用在微信公众号的文章中**

---
## 方法

### setfont()
异步方法，加载构造函数中传入的字体<br>
返回一个 Promise 对象. <br>
每个字体仅需要加载一次<br>

```
  await opensans.setFont();
```
或
```
  opensans.setFont().then();
```

### setFontFromBuffer()
从ArrayBuffer中读取一个字体，用于浏览器本地字体文件读取<br>
每个字体仅需要加载一次<br>
返回当前实例

### setOptions(options)

设置动画参数, 同 [options](#options)<br>
返回当前实例



### setStroke(stroke)

设置描边参数，同 [stroke](#stroke)<br>
返回当前实例



### create(text,selector) add(text,selector)

`create`：根据text字符串创建svg动画，先清空selector然后将svg插入到selector确定的DOM中。

`add`(v1.2.0)：根据text字符串创建svg动画，并直接插入到selector确定的DOM中

返回当前实例

属性名|类型|说明
---|:--:|---
text|String|待转换的字符串
selector|String|要插入的DOM的css选择器

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
      "font-size": 23,
      "fill-color":"white"
    }).create("Try it", ".button");
```

---
## 特殊字体

  * 像中文一样的字符含量很大的字体
  * 一些icon字体 如：在[iconfont](https://www.iconfont.cn/)下载的字体.

第一种情况下, 建议先进行字体压缩, 如[font-spider](https://github.com/aui/font-spider)或者其他字体压缩软件。<br>

第二种情，使用方法如下。

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
      "stroke-width": "1px"，
      "font-size": 22,
      "fill-color":"white"
    }).create(String.fromCharCode(0xf581), "#symbols")
      .create(String.fromCharCode(0xf164), "#symbols2");

      //你可以在下载字体的网站找到要使用的十六进制代码 调用create时传入即可。
      //将String.fromCharCode(十六进制代码) 作为create函数的第一个参数。
```

---
## 感谢 

[opentype.js](https://github.com/opentypejs/opentype.js) Read and write OpenType fonts using JavaScript. <br>
[fontawesom](https://fontawesome.com/) The iconic SVG, font, and CSS toolkit. <br>
[font-spider](https://github.com/aui/font-spider) Smart webfont compression and format conversion tool.  

---
(c) oubenruing 2019 | MIT License
