import{_ as n,o as s,c as a,e as p}from"./app-88849d99.js";const t={},e=p(`<h1 id="cross-domain-跨域" tabindex="-1"><a class="header-anchor" href="#cross-domain-跨域" aria-hidden="true">#</a> cross domain | 跨域</h1><p>同源指的是两个 URL 的协议、域名、端口一致，反之，则是<strong>跨域</strong>。</p><blockquote><p>跨域是浏览器的限制，你用抓包工具抓取接口数据，是可以看到接口已经把数据返回回来了，只是浏览器的限制，你获取不到数据。用postman请求接口能够请求到数据。这些再次印证了跨域是浏览器的限制。</p></blockquote><ul><li>JSONP</li><li>CORS<br> 出现的较晚，它是 <code>W3C</code> 标准，属于跨域 <code>AJAX</code> 请求的根本解决方案。支持 <code>GET</code> 和 <code>POST</code> 请求。缺点是不兼容某些低版本的浏览器。</li><li>Proxy</li></ul><h2 id="jsonp" tabindex="-1"><a class="header-anchor" href="#jsonp" aria-hidden="true">#</a> JSONP</h2><p>出现的早，兼容性好。只支持 <code>GET</code> 请求，不支持 <code>POST</code> 请求。</p><ol><li><p>前端方法示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">function</span> <span class="token function">jsonp</span><span class="token punctuation">(</span><span class="token parameter">req</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> script <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;script&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">var</span> url <span class="token operator">=</span> req<span class="token punctuation">.</span>url <span class="token operator">+</span> <span class="token string">&#39;?callback=&#39;</span> <span class="token operator">+</span> req<span class="token punctuation">.</span>callback<span class="token punctuation">.</span>name<span class="token punctuation">;</span>
        script<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>
        document<span class="token punctuation">.</span><span class="token function">getElementsByTagName</span><span class="token punctuation">(</span><span class="token string">&#39;head&#39;</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>script<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">function</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;hello &#39;</span> <span class="token operator">+</span> res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">jsonp</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">url</span> <span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">callback</span> <span class="token operator">:</span> hello 
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>服务器端代码：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">var</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;http&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> urllib <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;url&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">var</span> port <span class="token operator">=</span> <span class="token number">8080</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string-property property">&#39;data&#39;</span><span class="token operator">:</span><span class="token string">&#39;world&#39;</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

    http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span>res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">var</span> params <span class="token operator">=</span> urllib<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>url<span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>query<span class="token punctuation">.</span>callback<span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token number">0</span> 
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>query<span class="token punctuation">.</span>callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// jsonp</span>
            <span class="token keyword">var</span> str <span class="token operator">=</span> params<span class="token punctuation">.</span>query<span class="token punctuation">.</span>callback <span class="token operator">+</span> <span class="token string">&#39;(&#39;</span> <span class="token operator">+</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39;)&#39;</span><span class="token punctuation">;</span>
            res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span>port<span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;jsonp server is on&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>JSONP会出现安全问题</p><ul><li>CSRF攻击</li><li>XSS漏洞</li><li>服务器被黑，返回一串恶意执行的代码</li></ul><h2 id="cors" tabindex="-1"><a class="header-anchor" href="#cors" aria-hidden="true">#</a> CORS</h2><p><code>CORS</code> （Cross-Origin Resource Sharing，跨域资源共享）是一个系统，它由一系列传输的HTTP头组成，这些HTTP头决定浏览器是否阻止前端 <code>JavaScript</code> 代码获取跨域请求的响应<br><code>CORS</code> 实现起来非常方便，只需要增加一些 <code>HTTP</code> 头，让服务器能声明允许的访问来源<br> 只要后端实现了 <code>CORS</code>，就实现了跨域</p><p><code>koa</code> 框架示例</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;koa&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token parameter">ctx</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token string">&#39;Hello World&#39;</span><span class="token punctuation">;</span>
        ctx<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">&#39;Access-Control-Allow-Origin&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>Access-Control-Allow-Origin</code> 设置为 <code>*</code> 其实意义不大，可以说是形同虚设，实际应用中，上线前我们会将 <code>Access-Control-Allow-Origin</code> 值设为我们目标host</p></blockquote><h2 id="proxy" tabindex="-1"><a class="header-anchor" href="#proxy" aria-hidden="true">#</a> Proxy</h2><p>代理（Proxy）也称网络代理，是一种特殊的网络服务，允许一个（一般为客户端）通过这个服务与另一个网络终端（一般为服务器）进行非直接的连接。一些网关、路由器等网络设备具备网络代理功能。一般认为代理服务有利于保障网络终端的隐私或安全，防止攻击</p><ol><li><p><code>vue-cli</code> 里 <code>vue.config.js</code> 文件配置</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>amodule<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">&#39;127.0.0.1&#39;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token number">8084</span><span class="token punctuation">,</span>
        <span class="token literal-property property">open</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span><span class="token comment">// vue项目启动时自动打开浏览器</span>
        <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token string-property property">&#39;/api&#39;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// &#39;/api&#39;是代理标识，用于告诉node，url前面是/api的就是使用代理的</span>
                <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&quot;http://xxx.xxx.xx.xx:8080&quot;</span><span class="token punctuation">,</span> <span class="token comment">//目标地址，一般是指后台服务器地址</span>
                <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">//是否跨域</span>
                <span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// pathRewrite 的作用是把实际Request Url中的&#39;/api&#39;用&quot;&quot;代替</span>
                    <span class="token string-property property">&#39;^/api&#39;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span> 
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 通过axios发送请求中，配置请求的根路径</span>
axios<span class="token punctuation">.</span>defaults<span class="token punctuation">.</span>baseURL <span class="token operator">=</span> <span class="token string">&#39;/api&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>通过服务端实现代理请求转发<br><code>express</code> 示例：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>    <span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;express&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> proxy <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;http-proxy-middleware&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span>__dirname <span class="token operator">+</span> <span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">&#39;/api&#39;</span><span class="token punctuation">,</span> <span class="token function">proxy</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&#39;http://localhost:4000&#39;</span><span class="token punctuation">,</span> 
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    module<span class="token punctuation">.</span>exports <span class="token operator">=</span> app

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>配置 <code>nginx</code> 实现代理</p><div class="language-nginx line-numbers-mode" data-ext="nginx"><pre class="language-nginx"><code>    <span class="token directive"><span class="token keyword">server</span></span> <span class="token punctuation">{</span>
        <span class="token directive"><span class="token keyword">listen</span>    <span class="token number">80</span></span><span class="token punctuation">;</span>
        <span class="token comment"># server_name www.josephxia.com;</span>
        <span class="token directive"><span class="token keyword">location</span> /</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">root</span>  /var/www/html</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">index</span>  index.html index.htm</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">try_files</span> <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token directive"><span class="token keyword">location</span> /api</span> <span class="token punctuation">{</span>
            <span class="token directive"><span class="token keyword">proxy_pass</span>  http://127.0.0.1:3000</span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_redirect</span>   <span class="token boolean">off</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span>  Host       <span class="token variable">$host</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span>  X-Real-IP     <span class="token variable">$remote_addr</span></span><span class="token punctuation">;</span>
            <span class="token directive"><span class="token keyword">proxy_set_header</span>  X-Forwarded-For  <span class="token variable">$proxy_add_x_forwarded_for</span></span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol>`,17),o=[e];function c(l,i){return s(),a("div",null,o)}const r=n(t,[["render",c],["__file","cross-domain.html.vue"]]);export{r as default};