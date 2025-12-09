import{_ as n,o as s,c as a,b as e}from"./app-a6eacc5a.js";const t={},p=e(`<h1 id="array-prototype-reduce-迭代" tabindex="-1"><a class="header-anchor" href="#array-prototype-reduce-迭代" aria-hidden="true">#</a> Array.prototype.reduce() | 迭代</h1><h2 id="语法" tabindex="-1"><a class="header-anchor" href="#语法" aria-hidden="true">#</a> 语法</h2><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    arr<span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span>callback<span class="token punctuation">[</span><span class="token punctuation">,</span> initialValue<span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h2><ul><li><p><code>callback</code></p><ul><li>执行数组中每个值的函数，包含四个参数： <ul><li><code>accumulator</code><ul><li>累计器累计回调的返回值；它是上一次调用回调时返回的累积值，或 <code>initialValue</code></li></ul></li><li><code>currentValue</code><ul><li>数组中正在处理的元素</li></ul></li><li><code>currentIndex</code><ul><li>数组中正在处理的当前元素的索引。<strong>如果提供了 <code>initialValue</code>，则索引号为 <code>0</code>，否则索引为 <code>1</code></strong></li></ul></li><li><code>array</code><ul><li>调用 <code>reduce()</code> 的数组</li></ul></li></ul></li></ul></li><li><p><code>initialValue</code></p><ul><li>作为第一次调用 <code>callback</code> 函数时的第一个参数的值。如果没有提供初始值，则将使用数组中的第一个元素。在没有初始值的空数组上调用 <code>reduce</code> 将报错</li></ul></li></ul><h2 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h2><ol><li>判断 <code>this</code> 是否为 <code>null</code> 或 <code>undefined</code></li><li>判断 <code>callback</code> 是否为函数</li><li>初始化变量</li><li>如果没有提供 <code>initialValue</code>，则数组的第一个有效值作为累加器的初始值 <code>k++</code></li><li>用上文 <code>k</code> 值继续进行遍历</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>
<span class="token doc-comment comment">/**
 * 数组的reduce方法
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span><span class="token keyword">function</span><span class="token punctuation">}</span></span> <span class="token parameter">callback</span> 回调函数
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>any<span class="token punctuation">}</span></span> <span class="token parameter">initialValue</span> 初始值
 * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>any<span class="token punctuation">}</span></span> 返回值
 * 
 * */</span>

<span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">reduce</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">callback<span class="token punctuation">,</span> initialValue</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span> <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;Cannot read property &quot;reduce&quot; of null or undefined&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>callback<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token string">&#39;[object Function]&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span>callback <span class="token operator">+</span> <span class="token string">&#39; is not a function&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**
     * Object
     *  当调用或者构造 Object() 构造函数本身时，其返回值是一个对象。
     *  如果该值是 null 或者 undefined，它会生成并返回一个空对象。
     *  如果该值已经是一个对象，则返回该值。
     *  否则，它将返回与给定值对应的类型的对象。
     * */</span> 
    <span class="token keyword">let</span> <span class="token constant">O</span> <span class="token operator">=</span> <span class="token function">Object</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 所有非数值转换成0；
     * 所有大于等于 0 等数取整数部分；
     * */</span> 
    <span class="token keyword">let</span> len <span class="token operator">=</span> <span class="token constant">O</span><span class="token punctuation">.</span>length <span class="token operator">&gt;&gt;&gt;</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> k <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> accumulator <span class="token operator">=</span> initialValue<span class="token punctuation">;</span>

    
    <span class="token comment">// 如果第二个参数为undefined的情况下，则数组的第一个有效值作为累加器的初始值</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>accumulator <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token comment">// 如果超出数组界限还没有找到累加器的初始值，则TypeError</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>len <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;Reduce of empty array with no initial value&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> k <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> k<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token keyword">in</span> <span class="token constant">O</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                accumulator <span class="token operator">=</span> <span class="token constant">O</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">;</span>
                <span class="token comment">// 这里导致没有提供 initialValue 时，数组的第一个元素会被跳过 k 从1开始</span>
                k<span class="token operator">++</span><span class="token punctuation">;</span>
                <span class="token keyword">break</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token comment">// 以k值继续进行遍历</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token punctuation">;</span> k <span class="token operator">&lt;</span> len<span class="token punctuation">;</span> k<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>k <span class="token keyword">in</span> <span class="token constant">O</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            accumulator <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">undefined</span><span class="token punctuation">,</span> accumulator<span class="token punctuation">,</span> <span class="token constant">O</span><span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">,</span> k<span class="token punctuation">,</span> <span class="token constant">O</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> accumulator<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),c=[p];function o(l,i){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","array-reduce.html.vue"]]);export{d as default};
