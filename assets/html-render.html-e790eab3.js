import{_ as e,o as r,c as o,a,b as t,d as i,e as l}from"./app-3a3ba85f.js";const n={},s=t("h1",{id:"html-渲染过程",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#html-渲染过程","aria-hidden":"true"},"#"),i(" HTML 渲染过程")],-1),d=l('<p><em>整个渲染过程其实就是将URL对应的各种资源，通过浏览器渲染引擎的解析，输出可视化的图像。</em></p><h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2><ul><li>HTML 解释器<br> 解释HTML语言的解释器，本质是<strong>将 HTML 文本解释成 DOM 树</strong>（文档对象模型）。</li><li>CSS 解释器<br> 解释样式表的解释器，其作用是<strong>将 DOM 中的各个元素对象加上样式信息</strong>，从而为计算最后结果的布局提供依据。</li><li>布局<br><strong>将 DOM 和 CSS 样式信息结合起来</strong>，计算它们的大小位置等布局信息，形成一个能够表示这所有信息的内部表示模型即渲染树。</li><li>JavaScript 引擎：<br> JavaScript 可以修改网页的内容，也能修改 CSS 的信息，JavaScript 引擎<strong>解释 JavaScript 代码并把代码的逻辑和对 DOM 和 CSS 的改动信息应用到布局中</strong>去，从而改变渲染的结果。</li></ul><h2 id="过程" tabindex="-1"><a class="header-anchor" href="#过程" aria-hidden="true">#</a> 过程</h2><ol><li>解析HTML文件，创建DOM树<br><strong>浏览器解析html源码，然后创建一个 DOM 树。并行请求 css/image/js在DOM树中</strong>，每一个HTML标签都有一个对应的节点，并且每一个文本也都会有一个对应的文本节点。DOM树的根节点就是 documentElement，对应的是html标签。</li><li>解析CSS,形成CSS对象模型<br><strong>浏览器解析CSS代码，计算出最终的样式数据。构建CSSOM树</strong>。对CSS代码中非法的语法它会直接忽略掉。解析CSS的时候会按照如下顺序来定义优先级： <blockquote><p>浏览器默认设置 &lt; 用户设置 &lt; 外链样式 &lt; 内联样式 &lt; html中的style。</p></blockquote></li><li>将CSS与DOM合并，构建渲染树（renderingtree）<br><strong>DOM Tree + CSSOM –&gt; 渲染树（rendering tree）</strong>。渲染树和DOM树有点像，但是是有区别的。<strong>DOM树完全和html标签一一对应，但是渲染树会忽略掉不需要渲染的元素，比如head、display:none的元素等</strong>。而且一大段文本中的每一个行在渲染树中都是独立的一个节点。渲染树中的每一个节点都存储有对应的css属性。</li><li>布局和绘制<br> 一旦渲染树创建好了，浏览器就可以<strong>根据渲染树直接把页面绘制到屏幕上</strong>。</li></ol><p>四个步骤并不是一次性顺序完成的。<strong>如果DOM或者CSSOM被修改，以上过程会被重复执行</strong>。实际上，CSS和JavaScript往往会多次修改DOM或者CSSOM。</p><h2 id="repaint-重绘" tabindex="-1"><a class="header-anchor" href="#repaint-重绘" aria-hidden="true">#</a> Repaint(重绘)</h2><p>重绘是改变不影响元素在网页中的位置的元素样式时，譬如background-color(背景色)， border-color(边框色)，visibility(可见性)，浏览器会<strong>根据元素的新属性重新绘制一次(这就是重绘，或者说重新构造样式)，使元素呈现新的外观</strong>。</p><p>重绘不会带来重新布局，所以并不一定伴随重排。</p><h2 id="reflow-重排" tabindex="-1"><a class="header-anchor" href="#reflow-重排" aria-hidden="true">#</a> Reflow（重排）</h2><p><strong>渲染对象在创建完成并添加到渲染树时，并不包含位置和大小信息。计算这些值的过程称为布局或重排</strong>。</p><p>&quot;重绘&quot;不一定需要&quot;重排&quot;，比如改变某个网页元素的颜色，就只会触发&quot;重绘&quot;，不会触发&quot;重排&quot;，因为布局没有改变。</p><p>但是，<strong>&quot;重排&quot;必然导致&quot;重绘&quot;，比如改变一个网页元素的位置，就会同时触发&quot;重排&quot;和&quot;重绘&quot;，因为布局改变了。</strong></p><h2 id="优化渲染" tabindex="-1"><a class="header-anchor" href="#优化渲染" aria-hidden="true">#</a> 优化渲染</h2><ul><li>将多次改变样式属性的操作合并成一次操作</li><li>将需要多次重排的元素，position属性设为absolute或fixed，使它脱离文档流，<strong>重排的代价就是它自己的重排</strong>，而不会影响到其他元素。</li><li>不要把节点的属性值放在一个循环里当成循环里的变量</li><li>尽量使用 class 进行样式设置，因为 class 比 style 具有更高的性能</li><li>尽量使用 css3 动画，开启 GPU 加速</li><li>尽量使用事件委托，减少事件绑定的次数</li><li>由于display属性为none的元素不在渲染树中，对隐藏的元素操作不会引发其他元素的重排。如果要对一个元素进行复杂的操作时，可以先隐藏它，操作完成后再显示。这样只在隐藏和显示时触发2次重排。</li></ul>',15);function c(h,u){return r(),o("div",null,[s,a(" https://fe.ecool.fun/topic-answer/61b47ff6-9c4d-4fa2-b126-dc5ffff3e7c6?orderBy=updateTime&order=asc&tagId=0 "),d])}const g=e(n,[["render",c],["__file","html-render.html.vue"]]);export{g as default};
