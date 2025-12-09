import{_ as n,o as s,c as a,b as e}from"./app-a6eacc5a.js";const t="/record/assets/stack-497643be.png",o={},p=e(`<h1 id="context-上下文" tabindex="-1"><a class="header-anchor" href="#context-上下文" aria-hidden="true">#</a> context | 上下文</h1><p>执行上下文是一种对Javascript代码执行环境的抽象概念，也就是说只要有Javascript代码运行，那么它就一定是运行在执行上下文中</p><h2 id="类型" tabindex="-1"><a class="header-anchor" href="#类型" aria-hidden="true">#</a> 类型</h2><ul><li><strong>全局执行上下文</strong>：只有一个，浏览器中的全局对象就是 <code>window</code> 对象，<code>this</code> 指向这个全局对象</li><li><strong>函数执行上下文</strong>：存在无数个，只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文</li><li><strong>Eval 函数执行上下文</strong>：指的是运行在 <code>eval</code> 函数中的代码，很少用而且不建议使用</li></ul><blockquote><p>每次调用函数创建一个新的上下文，会创建一个私有作用域，函数内部声明的任何变量都不能在当前函数作用域外部直接访问，只有全局上下文（的变量）能被其他任何上下文访问。</p></blockquote><h2 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期" aria-hidden="true">#</a> 生命周期</h2><p>创建阶段 → 执行阶段 → 回收阶段</p><h3 id="创建阶段" tabindex="-1"><a class="header-anchor" href="#创建阶段" aria-hidden="true">#</a> 创建阶段</h3><p>即当函数被调用，但未执行任何其内部代码之前</p><ul><li>确定 <code>this</code> 的值，也被称为 This Binding</li><li>创建词法环境，也被称为 Lexical Environment</li><li>创建变量环境，也被称为 Variable Environment</li></ul><p>伪代码：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code>ExecutionContext <span class="token operator">=</span> <span class="token punctuation">{</span>
    ThisBinding<span class="token operator">:</span> <span class="token operator">&lt;</span><span class="token keyword">this</span> value<span class="token operator">&gt;</span><span class="token punctuation">,</span>  <span class="token comment">// this 值 </span>
    LexicalEnvironment<span class="token operator">:</span> <span class="token punctuation">{</span>       <span class="token comment">// 词法环境</span>
        <span class="token comment">// identifier bindings go here</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    VariableEnvironment<span class="token operator">:</span> <span class="token punctuation">{</span>      <span class="token comment">// 变量环境</span>
        <span class="token comment">// identifier bindings go here</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="this-binding" tabindex="-1"><a class="header-anchor" href="#this-binding" aria-hidden="true">#</a> This Binding</h4><p>官方的称呼为This Binding，在全局执行上下文中， <code>this</code> 总是指向全局对象，例如浏览器环境下 <code>this</code> 指向 <code>window</code> 对象。</p><p>而在函数执行上下文中，<code>this</code> 的值取决于函数的调用方式，如果被一个对象调用，那么 <code>this</code> 指向这个对象。否则<code>this</code>一般指向全局对象 <code>window</code> 或者 <code>undefined</code> （严格模式）。</p><h4 id="lexical-environment" tabindex="-1"><a class="header-anchor" href="#lexical-environment" aria-hidden="true">#</a> Lexical Environment</h4><p>词法环境是一个规范类型，用于定义标识符和具体变量和函数之间的关系，也就是说词法环境是一个存储标识符与变量和函数之间关系的数据结构</p><p>词法环境分为两种类型：</p><ul><li><strong>全局环境</strong>：对外部环境的引入记录为null，因为它本身就是最外层环境，除此之外它还记录了当前环境下的所有属性、方法位置。</li><li><strong>函数环境</strong>：包含了用户在函数中定义的所有属性方法外，还包含了一个arguments对象。函数词法环境的外部环境引入可以是全局环境，也可以是其它函数环境，这个根据实际代码而来。</li></ul><p>译文伪代码：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 全局环境</span>
GlobalExectionContext <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 全局词法环境</span>
    LexicalEnvironment<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 环境记录</span>
        EnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>
            Type<span class="token operator">:</span> <span class="token string">&quot;Object&quot;</span><span class="token punctuation">,</span> <span class="token comment">//类型为对象环境记录</span>
            <span class="token comment">// 标识符绑定在这里 </span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        outer<span class="token operator">:</span> <span class="token operator">&lt;</span> <span class="token keyword">null</span> <span class="token operator">&gt;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 函数环境</span>
FunctionExectionContext <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// 函数词法环境</span>
    LexicalEnvironment<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 环境纪录</span>
        EnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>
            Type<span class="token operator">:</span> <span class="token string">&quot;Declarative&quot;</span><span class="token punctuation">,</span> <span class="token comment">//类型为声明性环境记录</span>
            <span class="token comment">// 标识符绑定在这里 </span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        outer<span class="token operator">:</span> <span class="token operator">&lt;</span> Global or outerfunction environment reference <span class="token operator">&gt;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="variable-environment" tabindex="-1"><a class="header-anchor" href="#variable-environment" aria-hidden="true">#</a> Variable Environment</h4><p>变量环境可以说也是词法环境，它具备词法环境所有属性，一样有环境记录与外部环境引入。在ES6中唯一的区别在于<strong>词法环境用于存储函数声明与<code>let</code>、<code>const</code>声明的变量</strong>，而<strong>变量环境仅仅存储<code>var</code>声明的变量</strong>。</p><p>通过一串伪代码来理解：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>  
<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>  
<span class="token keyword">var</span> c<span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">multiply</span><span class="token punctuation">(</span>e<span class="token punctuation">,</span> f<span class="token punctuation">)</span> <span class="token punctuation">{</span>  
    <span class="token keyword">var</span> g <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>  
    <span class="token keyword">return</span> e <span class="token operator">*</span> f <span class="token operator">*</span> g<span class="token punctuation">;</span>  
<span class="token punctuation">}</span>

c <span class="token operator">=</span> <span class="token function">multiply</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用伪代码来描述上述代码中执行上下文的创建过程：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//全局执行上下文</span>
GlobalExectionContext <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token comment">// this绑定为全局对象</span>
    ThisBinding<span class="token operator">:</span> <span class="token operator">&lt;</span>Global Object<span class="token operator">&gt;</span><span class="token punctuation">,</span>
    <span class="token comment">// 词法环境</span>
    LexicalEnvironment<span class="token operator">:</span> <span class="token punctuation">{</span>  
        <span class="token comment">//环境记录</span>
        EnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>  
            Type<span class="token operator">:</span> <span class="token string">&quot;Object&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 对象环境记录</span>
            <span class="token comment">// 标识符绑定在这里 let const创建的变量a b在这</span>
            a<span class="token operator">:</span> <span class="token operator">&lt;</span> uninitialized <span class="token operator">&gt;</span><span class="token punctuation">,</span>  
            b<span class="token operator">:</span> <span class="token operator">&lt;</span> uninitialized <span class="token operator">&gt;</span><span class="token punctuation">,</span>  
            multiply<span class="token operator">:</span> <span class="token operator">&lt;</span> func <span class="token operator">&gt;</span>  
        <span class="token punctuation">}</span>
      <span class="token comment">// 全局环境外部环境引入为null</span>
      outer<span class="token operator">:</span> <span class="token operator">&lt;</span><span class="token keyword">null</span><span class="token operator">&gt;</span>  
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    VariableEnvironment<span class="token operator">:</span> <span class="token punctuation">{</span>  
        EnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>  
            Type<span class="token operator">:</span> <span class="token string">&quot;Object&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 对象环境记录</span>
            <span class="token comment">// 标识符绑定在这里  var创建的c在这</span>
            c<span class="token operator">:</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span>  
        <span class="token punctuation">}</span>
        <span class="token comment">// 全局环境外部环境引入为null</span>
        outer<span class="token operator">:</span> <span class="token operator">&lt;</span><span class="token keyword">null</span><span class="token operator">&gt;</span>  
    <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>

  <span class="token comment">// 函数执行上下文</span>
FunctionExectionContext <span class="token operator">=</span> <span class="token punctuation">{</span>
     <span class="token comment">//由于函数是默认调用 this绑定同样是全局对象</span>
    ThisBinding<span class="token operator">:</span> <span class="token operator">&lt;</span>Global Object<span class="token operator">&gt;</span><span class="token punctuation">,</span>
    <span class="token comment">// 词法环境</span>
    LexicalEnvironment<span class="token operator">:</span> <span class="token punctuation">{</span>  
        EnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>  
            Type<span class="token operator">:</span> <span class="token string">&quot;Declarative&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 声明性环境记录</span>
            <span class="token comment">// 标识符绑定在这里  arguments对象在这</span>
            Arguments<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token number">0</span><span class="token operator">:</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> length<span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">}</span><span class="token punctuation">,</span>  
        <span class="token punctuation">}</span><span class="token punctuation">,</span>  
        <span class="token comment">// 外部环境引入记录为&lt;/Global&gt;</span>
        outer<span class="token operator">:</span> <span class="token operator">&lt;</span>GlobalEnvironment<span class="token operator">&gt;</span>  
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  
    VariableEnvironment<span class="token operator">:</span> <span class="token punctuation">{</span>  
        EnvironmentRecord<span class="token operator">:</span> <span class="token punctuation">{</span>  
            Type<span class="token operator">:</span> <span class="token string">&quot;Declarative&quot;</span><span class="token punctuation">,</span>  <span class="token comment">// 声明性环境记录</span>
            <span class="token comment">// 标识符绑定在这里  var创建的g在这</span>
            g<span class="token operator">:</span> <span class="token keyword">undefined</span>  
        <span class="token punctuation">}</span><span class="token punctuation">,</span>  
        <span class="token comment">// 外部环境引入记录为&lt;/Global&gt;</span>
        outer<span class="token operator">:</span> <span class="token operator">&lt;</span>GlobalEnvironment<span class="token operator">&gt;</span>  
    <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建阶段，在代码中扫描变量和函数声明，将函数声明存储在环境中，但变量会被初始化为 <code>undefined</code> ( <code>var</code> 声明的情况下)和保持 <code>&lt; uninitialized &gt;</code>(使用 <code>let</code> 和 <code>const</code> 声明的情况下)</p><p>这就是变量提升的实际原因</p><h3 id="执行阶段" tabindex="-1"><a class="header-anchor" href="#执行阶段" aria-hidden="true">#</a> 执行阶段</h3><p>在这阶段，执行变量赋值、代码执行</p><p>如果 Javascript 引擎在源代码中声明的实际位置找不到变量的值，那么将为其分配 <code>undefined</code> 值</p><h3 id="回收阶段" tabindex="-1"><a class="header-anchor" href="#回收阶段" aria-hidden="true">#</a> 回收阶段</h3><p>当函数执行完毕，或者全局上下文中的代码执行完毕，那么执行上下文就会被销毁，这个过程称为执行上下文的回收阶段</p><h2 id="执行栈" tabindex="-1"><a class="header-anchor" href="#执行栈" aria-hidden="true">#</a> 执行栈</h2><p>执行栈是一种拥有 LIFO（后进先出）数据结构的栈，用于存储代码运行时创建的所有执行上下文</p><p><img src="`+t+'" alt="extend"></p>',37),i=[p];function c(l,r){return s(),a("div",null,i)}const u=n(o,[["render",c],["__file","context.html.vue"]]);export{u as default};
