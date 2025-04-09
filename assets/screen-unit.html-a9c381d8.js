import{_ as i,o as l,c as a,a as r,b as e,d,e as c}from"./app-3a3ba85f.js";const t={},s=e("h1",{id:"screen-unit",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#screen-unit","aria-hidden":"true"},"#"),d(" screen unit")],-1),n=c('<details class="custom-container details"><summary>专业名词单位</summary><ul><li>DPI -&gt; dots per inch，表示每英寸（对角线长度）能打印上的墨滴数量。最初应用于打印技术中。打印设备多在 300 至 3600 DPI 之间。</li><li>PPI -&gt; pixels per inch，电子显示设备从打印设备中借鉴了 DPI 的概念，产生了 PPI的概念。即显示器每英寸（对角线长度）上像素点的数量，指像素密度<br> DPI 和 PPI 经常混用。因为很多行业将“Dot”泛指为所有的图像基本单元。多数情况下，DPI=PPI。</li></ul></details><h2 id="逻辑像素-logical-pixels" tabindex="-1"><a class="header-anchor" href="#逻辑像素-logical-pixels" aria-hidden="true">#</a> 逻辑像素 （logical pixels）</h2><p><strong>一般情况，页面缩放比为1，1个CSS像素等于1个设备独立像素</strong></p><ol><li>逻辑像素（logical pixels）， 又称CSS像素是一个抽象的单位，主要用于浏览器渲染, 在 CSS 规范中，长度单位可以分为两类，绝对单位以及相对单位。</li><li>CSS像素的大小与显示设备的物理像素有关，但是两者并不总是相同。px会受到下面的因素的影响而变化： <ul><li>每英寸像素（PPI）</li><li>设备像素比（DPR）</li></ul></li><li>CSS像素的大小取决于浏览器的设置，用户可以在浏览器中更改设置，使得1个CSS像素不等于1个物理像素。 <ul><li>假设页面放大一倍，原来的 1px 的东西变成 2px，在实际宽度不变的情况下1px 变得跟原来的 2px 的长度（长宽）一样了（元素会占据更多的设备像素）</li><li>假设原来需要 320px 才能填满的宽度现在只需要 160px</li></ul></li><li>CSS像素又具有两个方面的相对性： <ul><li>在同一个设备上，每1个 CSS 像素所代表的设备像素是可以变化的（比如调整屏幕的分辨率）</li><li>在不同的设备之间，每1个 CSS 像素所代表的设备像素是可以变化的（比如两个不同型号的手机）</li></ul></li></ol><h2 id="设备像素" tabindex="-1"><a class="header-anchor" href="#设备像素" aria-hidden="true">#</a> 设备像素</h2><ul><li>设备像素（device pixels），又称为物理像素（physical pixels），是显示设备中一个最微小的物理部件。</li><li>不一定是一个小正方形区块，也没有标准的宽高，只是用于显示丰富色彩的一个“点” 。</li></ul><h2 id="设备独立像素" tabindex="-1"><a class="header-anchor" href="#设备独立像素" aria-hidden="true">#</a> 设备独立像素</h2><ul><li>设备独立像素（device-independent pixels），也称为密度无关像素（density-independent pixels），缩写为dip或dp，是一个基于屏幕密度的抽象单位。</li><li>一个设备独立像素里可能包含1个或者多个物理像素点，包含的越多则屏幕看起来越清晰</li></ul><h2 id="设备像素比" tabindex="-1"><a class="header-anchor" href="#设备像素比" aria-hidden="true">#</a> 设备像素比</h2><ul><li><p>设备像素比（device pixel ratio），简称dpr，是一个物理像素和设备独立像素的比值，它的值可以按照下面的公式计算得到：<br><code>dpr = 设备像素 / 设备独立像素</code></p></li><li><p>当dpr为2/1时，表示1个设备独立像素由4(2*2)个物理像素点组成，显示为1个css像素（1px）</p></li></ul><h2 id="ppi" tabindex="-1"><a class="header-anchor" href="#ppi" aria-hidden="true">#</a> ppi</h2><ul><li>ppi（pixels per inch），即每英寸像素数，是一个显示设备的参数，表示每英寸的物理像素数。</li><li>例如，一块 5 英寸的手机屏幕，分辨率为 1920x1080，那么它的 ppi 就是 440。</li><li>ppi 计算公式：<br><code>ppi = √(width² + height²) / inches</code></li></ul>',12);function p(h,o){return l(),a("div",null,[s,r(" https://fe.ecool.fun/topic/9d9b80c8-3768-4bf3-96a6-b6c6bf7cb8c3?orderBy=updateTime&order=asc&tagId=0 "),n])}const x=i(t,[["render",p],["__file","screen-unit.html.vue"]]);export{x as default};
