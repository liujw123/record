import{_ as s,o as n,c as a,b as e}from"./app-5f19dd66.js";const t={},l=e(`<h1 id="docker-清除脚本" tabindex="-1"><a class="header-anchor" href="#docker-清除脚本" aria-hidden="true">#</a> docker 清除脚本</h1><p><strong>适用于 Debian/Ubuntu 系统</strong></p><ol><li>新建/编辑文件 <code>nano uninstall_docker.sh</code>;</li><li>赋权执行 <code>chmod +x uninstall_docker.sh</code>;</li><li>执行脚本 <code>./uninstall_docker.sh</code>;</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;=== 🧹 Docker 卸载工具启动 ===&quot;</span>

<span class="token comment"># 检查是否安装了 Docker</span>
<span class="token keyword">if</span> <span class="token operator">!</span> <span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> <span class="token function">docker</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ 当前系统未检测到 Docker，无需卸载。&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">0</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;⚠️ 检测到系统已安装 Docker：<span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token parameter variable">--version</span><span class="token variable">)</span></span>&quot;</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;是否继续彻底卸载 Docker 及所有相关数据？(y/N): &quot;</span> confirm
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$confirm</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;y&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token string">&quot;<span class="token variable">$confirm</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;Y&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;❎ 操作取消，未做任何修改。&quot;</span>
    <span class="token builtin class-name">exit</span> <span class="token number">0</span>
<span class="token keyword">fi</span>

<span class="token comment"># 停止 Docker 服务</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;→ 停止 Docker 服务...&quot;</span>
systemctl stop <span class="token function">docker</span> <span class="token operator">||</span> <span class="token boolean">true</span>
systemctl stop containerd <span class="token operator">||</span> <span class="token boolean">true</span>

<span class="token comment"># 卸载所有相关软件包</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;→ 卸载 Docker 软件包...&quot;</span>
<span class="token function">apt-get</span> purge <span class="token parameter variable">-y</span> <span class="token punctuation">\\</span>
    docker-ce <span class="token punctuation">\\</span>
    docker-ce-cli <span class="token punctuation">\\</span>
    containerd.io <span class="token punctuation">\\</span>
    docker-buildx-plugin <span class="token punctuation">\\</span>
    docker-compose-plugin <span class="token punctuation">\\</span>
    docker-ce-rootless-extras <span class="token operator">||</span> <span class="token boolean">true</span>

<span class="token comment"># 自动清理依赖</span>
<span class="token function">apt-get</span> autoremove <span class="token parameter variable">-y</span>

<span class="token comment"># 删除 APT 源和 GPG 密钥</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;→ 删除软件源和 GPG 密钥...&quot;</span>
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/apt/sources.list.d/docker.list
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /usr/share/keyrings/docker-ce.gpg

<span class="token comment"># 删除配置、网络、socket、日志等</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;→ 删除配置文件和服务目录...&quot;</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/docker
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/containerd
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/run/docker*
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /run/docker*
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /lib/systemd/system/docker.service
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /lib/systemd/system/containerd.service
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/log/docker

<span class="token comment"># 提示是否删除数据目录</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;⚠️ /var/lib/docker 包含镜像、容器、卷等数据。&quot;</span>
<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;是否删除 /var/lib/docker？此操作不可恢复！(y/N): &quot;</span> deldata
<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$deldata</span>&quot;</span> <span class="token operator">==</span> <span class="token string">&quot;y&quot;</span> <span class="token operator">||</span> <span class="token string">&quot;<span class="token variable">$deldata</span>&quot;</span> <span class="token operator">==</span> <span class="token string">&quot;Y&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;→ 删除 /var/lib/docker ...&quot;</span>
    <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/docker
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&quot;→ 保留 /var/lib/docker 数据目录。&quot;</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">echo</span> <span class="token string">&quot;✅ Docker 已彻底卸载完成。&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),i=[l];function o(c,p){return n(),a("div",null,i)}const d=s(t,[["render",o],["__file","docker_remove.html.vue"]]);export{d as default};
