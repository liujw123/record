import{_ as e,o as c,c as t,e as r}from"./app-3a3ba85f.js";const d={},a=r('<h1 id="script" tabindex="-1"><a class="header-anchor" href="#script" aria-hidden="true">#</a> script</h1><p>script标签用于加载脚本与执行脚本</p><h2 id="直接使用script脚本" tabindex="-1"><a class="header-anchor" href="#直接使用script脚本" aria-hidden="true">#</a> 直接使用script脚本</h2><p><code>&lt;script src=&#39;xxx&#39;&gt;&lt;/script&gt;</code></p><ul><li>在脚本加载&amp;执行的过程中，会阻塞后续的DOM渲染。</li><li>如果引用各种第三方脚本, 第三方服务商出现了一些小问题，比如延迟之类的，就会使得页面白屏。</li></ul><h2 id="defer" tabindex="-1"><a class="header-anchor" href="#defer" aria-hidden="true">#</a> defer</h2><p><code>&lt;script src=&#39;xxx&#39; defer&gt;&lt;/script&gt;</code></p><ul><li>有多个设置了 <code>defer</code> 属性的 <code>script</code> 标签存在，则会按照顺序执行所有的 <code>script</code> ， <code>defer</code> 脚本会在文档渲染完毕后， <code>DOMContentLoaded</code> 事件调用前执行。</li></ul><h2 id="async" tabindex="-1"><a class="header-anchor" href="#async" aria-hidden="true">#</a> async</h2><p><code>&lt;script src=&#39;xxx&#39; async&gt;&lt;/script&gt;</code></p><ul><li><code>async</code> 的执行并不会按照 <code>script</code> 标签在页面中的顺序来执行，而是谁先加载完谁先执行。</li></ul>',11),i=[a];function s(o,l){return c(),t("div",null,i)}const p=e(d,[["render",s],["__file","script.html.vue"]]);export{p as default};
