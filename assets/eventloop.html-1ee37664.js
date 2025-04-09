import{_ as s,o as a,c as t,a as p,b as n,d as e,e as o}from"./app-3a3ba85f.js";const c="/record/assets/event_loop-343bc873.png",i="/record/assets/micro-task-e57733bf.png",l={},u=n("h1",{id:"event-loop",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#event-loop","aria-hidden":"true"},"#"),e(" Event Loop")],-1),k=o('<p><code>JavaScript</code> 在设计之初便是单线程，即指程序运行时，只有一个线程存在，同一时间只能做一件事<br> 为了解决单线程运行阻塞问题， <code>JavaScript</code> 用到了计算机系统的一种运行机制，这种机制就叫做<strong>事件循环</strong>（Event Loop）</p><h2 id="同步-异步任务" tabindex="-1"><a class="header-anchor" href="#同步-异步任务" aria-hidden="true">#</a> 同步&amp;异步任务</h2><ul><li><strong>同步任务</strong>：立即执行的任务，同步任务一般会直接进入到主线程中执行</li><li><strong>异步任务</strong>：异步执行的任务，比如<code>ajax</code>网络请求，<code>setTimeout</code> 定时函数等</li></ul><p>同步任务进入主线程，即主执行栈，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就是<strong>事件循环</strong></p><p><img src="'+c+`" alt="event loop"></p><h2 id="宏任务-微任务" tabindex="-1"><a class="header-anchor" href="#宏任务-微任务" aria-hidden="true">#</a> 宏任务&amp;微任务</h2><p>异步任务还可以细分为微任务与宏任务</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>

    <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;new Promise&#39;</span><span class="token punctuation">)</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;then&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><s>单纯分同步&amp;异步任务则会输出 -&gt; 1 =&gt; &#39;new Promise&#39; =&gt; 3 =&gt; 2 =&gt; &#39;then&#39;</s></li><li>但是实际上输出的是 -&gt; 1=&gt;&#39;new Promise&#39;=&gt; 3 =&gt; &#39;then&#39; =&gt; 2</li></ul><p>原因在于异步任务执行顺序，事件队列其实是一个“先进先出”的数据结构，排在前面的事件会优先被主线程读取<br> 例子中 <code>setTimeout</code> 回调事件是先进入队列中的，按理说应该先于 .then 中的执行，但是结果却偏偏相反<br> 原因在于异步任务还可以细分为<strong>微任务</strong>与<strong>宏任务</strong></p><h3 id="宏任务" tabindex="-1"><a class="header-anchor" href="#宏任务" aria-hidden="true">#</a> 宏任务</h3><p>宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合</p><ul><li><code>script</code>整体代码</li><li><code>setTimeout</code></li><li><code>setInterval</code></li><li><code>setImmediate</code></li><li><code>I/O</code></li><li><code>UI rendering</code></li></ul><h2 id="微任务" tabindex="-1"><a class="header-anchor" href="#微任务" aria-hidden="true">#</a> 微任务</h2><p>一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前宏任务结束之前</p><ul><li><code>Promise.then</code></li><li><code>MutationObserver</code></li><li><code>process.nextTick</code> （Node.js）</li><li><code>Object.observe</code> （废弃）</li></ul><p><strong>事件循环，宏任务，微任务</strong>的关系:</p><ul><li>执行一个宏任务，如果遇到微任务就将它放到微任务的事件队列中</li><li>当前宏任务执行完成后，会查看微任务的事件队列，然后将里面的所有微任务依次执行完</li></ul><p><img src="`+i+`" alt="micro task"></p><h2 id="async-await" tabindex="-1"><a class="header-anchor" href="#async-await" aria-hidden="true">#</a> async/await</h2><p><code>async</code> 是异步的意思，<code>await</code> 则可以理解为等待</p><h3 id="async" tabindex="-1"><a class="header-anchor" href="#async" aria-hidden="true">#</a> async</h3><p><code>async</code> 函数是 <code>Generator</code> 函数的语法糖， <code>async</code> 函数返回一个 <code>Promise</code> 对象，可以使用 <code>then</code> 方法添加回调函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">data</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 100</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="await" tabindex="-1"><a class="header-anchor" href="#await" aria-hidden="true">#</a> await</h3><p><code>await</code> 命令后面是一个 <code>Promise</code> 对象，返回该对象的结果。如果不是 <code>Promise</code> 对象，就直接返回对应的值</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// 等同于</span>
        <span class="token comment">// return 123</span>
        <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token number">123</span>
    <span class="token punctuation">}</span>
    <span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">v</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不管 <code>await</code> 后面跟着的是什么，<code>await</code> 都会阻塞后面的代码</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">await</span> <span class="token function">fn2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 阻塞后面的代码</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">fn2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面代码中，<code>await</code> 会阻塞后面的代码（加入微任务队列），等到 <code>fn2</code>&amp;&amp;外面的 <code>console.log(4)</code> 执行完毕，才会回到 <code>fn</code> 执行 <code>console.log(2)</code></p><blockquote><p>结果为：1 3 4 2</p></blockquote><h2 id="promise-链式分析" tabindex="-1"><a class="header-anchor" href="#promise-链式分析" aria-hidden="true">#</a> promise 链式分析</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then1</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then2</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then3</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
                Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then4</span>
                        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then5</span>
                        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then6</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">6</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then7</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">7</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then8</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>
        Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then9</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">9</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then10</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> <span class="token comment">// then11</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>执行过程</summary><p>// 微任务队列 先进先出 入栈: -&gt;[] 出栈: then -&gt;<br> // 注意点：then中的同步代码执行完毕后 才会继续链式调用，将后面的then继续放入队列中</p><p>// -&gt; [then1]<br> // then1 -&gt; 执行同步代码 打印1 将then2放入队列 then1中的同步代码执行完毕 将then1后的then7放入队列</p><p>// -&gt; [then7, then2]<br> // then2 -&gt; 执行同步代码 打印2 then2中的同步代码执行完毕 将then2后的then3放入队列</p><p>// -&gt; [then3, then7]<br> // then7 -&gt; 执行同步代码 打印7 then7中的同步代码执行完毕 将then8放入队列</p><p>// -&gt; [then8, then3]<br> // then3 -&gt; 执行同步代码 打印3 定义了一个新的promise 将then4放入队列 then3中的同步代码执行完毕 将then3后面的then6放入队列中</p><p>// -&gt; [then6, then4, then8]<br> // then8 -&gt; 执行同步代码 打印8 定义了一个新的promise 将then9放入队列 then8中的同步代码执行完毕 将then8后面的then11放入队列中</p><p>// -&gt; [then11, then9, then6, then4]<br> // then4 -&gt; 执行同步代码 打印4 then4中的同步代码执行完毕 将then5放入队列</p><p>// -&gt; [then5, then11, then9, then6]<br> // then6 -&gt; 执行同步代码 打印6 then6中的同步代码执行完毕</p><p>// then9 -&gt; 执行同步代码 打印9 then9中的同步代码执行完毕 将then10放入队列中</p><p>// -&gt; [then10, then5, then11]<br> // -&gt; then11 -&gt; 执行同步代码 打印11 then11中的同步代码执行完毕<br> // -&gt; then5 -&gt; 执行同步代码 打印5 then5中的同步代码执行完毕<br> // -&gt; then10 -&gt; 执行同步代码 打印10 then10中的同步代码执行完毕</p></details>`,34);function d(r,v){return a(),t("div",null,[u,p(" https://fe.ecool.fun/topic-answer/b1b488cb-0f79-4d12-bdab-4c070e0da072?orderBy=updateTime&order=asc&tagId=0 "),k])}const h=s(l,[["render",d],["__file","eventloop.html.vue"]]);export{h as default};
