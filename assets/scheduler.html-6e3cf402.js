import{_ as n,o as s,c as a,e as t}from"./app-88849d99.js";const p={},e=t(`<h1 id="scheduler-调度器" tabindex="-1"><a class="header-anchor" href="#scheduler-调度器" aria-hidden="true">#</a> Scheduler | 调度器</h1><p>有并发限制的 Promise 调度器</p><blockquote><p>例如有 4 个任务，完成时间分别为，1000ms、500ms、300ms、400ms<br> 在调度器中的执行完成顺序应该为 2、3、1、4</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">class</span> <span class="token class-name">Scheduler</span> <span class="token punctuation">{</span>
        <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">limit</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 最大执行事件数量</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>max <span class="token operator">=</span> limit<span class="token punctuation">;</span>
            <span class="token comment">// 事件收集队列</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>queues <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token comment">// 当前执行事件数量</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 事务添加</span>
        <span class="token function">addTask</span><span class="token punctuation">(</span><span class="token parameter">time<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 添加事务，注意 new 操作要在执行阶段</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>queues<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token parameter">rs</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
                <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token parameter">_</span><span class="token operator">=&gt;</span> <span class="token function">rs</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 事务开始</span>
        <span class="token function">taskStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token comment">// 循环并发执行</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>max<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">excute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 事务执行</span>
        <span class="token function">excute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">&gt;=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>max <span class="token operator">||</span> <span class="token operator">!</span><span class="token keyword">this</span><span class="token operator">?.</span>queues<span class="token operator">?.</span>length<span class="token punctuation">)</span><span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token comment">// 增记录</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token comment">// 取出 先进先出</span>
            <span class="token keyword">let</span> _promiseTask <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>queues<span class="token punctuation">.</span><span class="token function">shift</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 执行</span>
            <span class="token function">_promiseTask</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token operator">=&gt;</span><span class="token punctuation">{</span>
                <span class="token comment">// 回调</span>
                callback<span class="token operator">&amp;&amp;</span><span class="token function">callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 减记录</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>count <span class="token operator">--</span><span class="token punctuation">;</span>
                <span class="token comment">// 递归，剩余执行</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">excute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 实例化一个调度器</span>
    <span class="token keyword">let</span> scheduler <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scheduler</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> <span class="token function-variable function">addTask</span> <span class="token operator">=</span> <span class="token punctuation">(</span> <span class="token parameter">time<span class="token punctuation">,</span> text</span> <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        scheduler<span class="token punctuation">.</span><span class="token function">addTask</span><span class="token punctuation">(</span>time<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span>console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">addTask</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">,</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">addTask</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">,</span> <span class="token string">&#39;2&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">addTask</span><span class="token punctuation">(</span><span class="token number">300</span><span class="token punctuation">,</span> <span class="token string">&#39;3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">addTask</span><span class="token punctuation">(</span><span class="token number">400</span><span class="token punctuation">,</span> <span class="token string">&#39;4&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    scheduler<span class="token punctuation">.</span><span class="token function">taskStart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 2 3 1 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(p,[["render",o],["__file","scheduler.html.vue"]]);export{k as default};