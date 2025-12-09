import{_ as s,o as n,c as a,b as e}from"./app-a6eacc5a.js";const i={},t=e(`<h1 id="docker-安装脚本-国内" tabindex="-1"><a class="header-anchor" href="#docker-安装脚本-国内" aria-hidden="true">#</a> docker 安装脚本（国内）</h1><p><strong>适用于 Debian/Ubuntu 系统</strong></p><ol><li>新建/编辑文件 <code>nano install-docker-cn.sh</code>;</li><li>赋权执行 <code>chmod +x install-docker-cn.sh</code>;</li><li>执行脚本 <code>./install-docker-cn.sh</code>;</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;=== Docker 安装脚本启动 ===&quot;</span>

<span class="token comment"># 检查是否已安装 Docker</span>
<span class="token keyword">if</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> <span class="token function">docker</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;⚠️ 发现系统已安装 Docker：<span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token parameter variable">--version</span><span class="token variable">)</span></span>&quot;</span>
    <span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;是否继续覆盖安装？(y/N): &quot;</span> confirm
    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$confirm</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;y&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token string">&quot;<span class="token variable">$confirm</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;Y&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 安装中止，未修改系统。&quot;</span>
        <span class="token builtin class-name">exit</span> <span class="token number">0</span>
    <span class="token keyword">fi</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;=== [1/6] 更新系统包索引（包含重试逻辑） ===&quot;</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">..</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token function">apt-get</span> update <span class="token parameter variable">-y</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">break</span> <span class="token operator">||</span> <span class="token punctuation">{</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;⚠️ apt-get update 失败，重试中 (<span class="token variable">$i</span>/3)...&quot;</span>
        <span class="token function">sleep</span> <span class="token number">2</span>
    <span class="token punctuation">}</span>
<span class="token keyword">done</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;=== [2/6] 安装依赖软件包 ===&quot;</span>
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token punctuation">\\</span>
    apt-transport-https <span class="token punctuation">\\</span>
    ca-certificates <span class="token punctuation">\\</span>
    <span class="token function">curl</span> <span class="token punctuation">\\</span>
    gnupg <span class="token punctuation">\\</span>
    lsb-release <span class="token punctuation">\\</span>
    software-properties-common

<span class="token builtin class-name">echo</span> <span class="token string">&quot;=== [3/6] 添加 Docker 官方 GPG 密钥（清华镜像） ===&quot;</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/share/keyrings
<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/debian/gpg <span class="token operator">|</span> gpg <span class="token parameter variable">--dearmor</span> <span class="token parameter variable">-o</span> /usr/share/keyrings/docker-ce.gpg

<span class="token builtin class-name">echo</span> <span class="token string">&quot;=== [4/6] 配置 Docker 软件源为清华镜像 ===&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>
<span class="token string">&quot;deb [arch=<span class="token variable"><span class="token variable">$(</span>dpkg --print-architecture<span class="token variable">)</span></span> signed-by=/usr/share/keyrings/docker-ce.gpg] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/debian \\
<span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-sc</span><span class="token variable">)</span></span> stable&quot;</span> <span class="token operator">|</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list

<span class="token builtin class-name">echo</span> <span class="token string">&quot;=== [5/6] 再次更新包索引 ===&quot;</span>
<span class="token function">apt-get</span> update <span class="token parameter variable">-y</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;=== [6/6] 安装 Docker 组件 ===&quot;</span>
<span class="token function">apt-get</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

<span class="token comment"># zero_free镜像服务</span>
<span class="token comment"># https://github.com/cmliu/CF-Workers-docker.io</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;=== 🛠 配置 Docker 镜像加速器（jsDelivr Cloudflare Workers） ===&quot;</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF
{
  &quot;registry-mirrors&quot;: [
     &quot;https://docker.jsdelivr.fyi&quot;,
     &quot;https://dockercf.jsdelivr.fyi&quot;,
     &quot;https://dockertest.jsdelivr.fyi&quot;
  ]
}
EOF</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;=== 🔄 重启 Docker 并设置开机自启 ===&quot;</span>
systemctl daemon-reload
systemctl restart <span class="token function">docker</span>
systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ Docker 安装并配置完成！使用 &#39;docker version&#39; 检查版本。&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),l=[t];function c(o,p){return n(),a("div",null,l)}const d=s(i,[["render",c],["__file","docker_install.html.vue"]]);export{d as default};
