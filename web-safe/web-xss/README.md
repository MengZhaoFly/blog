## XSS
cross site script 跨站脚本攻击
用不合法途径往 web页面插入可执行的代码 
攻击类型：
1. 反射型：
   xss 代码存在 url 中，服务器解析请求，把 XSS 的代码一并返回，web网页得到响应，执行了 XSS 代码，过程向一次反射一样，
2. 存储型：
   唯一区别 xss的代码 有没有永久保留在 服务器（数据库，文件...）中

3. DOM 型 XSS

DOM 型 XSS 的攻击步骤：
攻击者构造出特殊的 URL，其中包含恶意代码。前端 JavaScript 取出 URL 中的恶意代码并执行。
恶意代码窃取用户数据并发送到攻击者的网站，或者冒充用户的行为，调用目标网站接口执行攻击者指定的操作。

DOM 型 XSS 跟前两种 XSS 的区别：DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞，而其他两种 XSS 都属于服务端的安全漏洞。



## 防护
- 预防存储型和反射型 XSS 攻击
  - 对 HTML 做充分转义,

html entity:https://dev.w3.org/html5/html-author/charref
<
&lt; &LT;     &名字
&#x0003C;     &#x 16 进制
&#60;         &#60 10 进制
```html
<!-- HTML 标签内文字内容 -->
<div><%= Encode.forHtml(UNTRUSTED) %></div>

<!-- HTML 标签属性值 除了空格符可以闭合当前属性外，这些符号也可以：
%     *     +     ,     –     /     ;     <     =     >     ^     |     `(反单引号，IE会认为它是单引号) all.width -->
<input value="<%= Encode.forHtml(UNTRUSTED) %>" />

<!-- CSS 属性值 -->
<div style="width:<= Encode.forCssString(UNTRUSTED) %>">
<div style="background:<= Encode.forCssUrl(UNTRUSTED) %>">
<style></style>
<!-- JavaScript 内联代码块 -->
<script>
  var msg = "<%= Encode.forJavaScript(UNTRUSTED) %>";
  alert(msg);
</script>

<!-- JavaScript 内联代码块内嵌 JSON -->
<script>
var __INITIAL_STATE__ = JSON.parse('<%= Encoder.forJavaScript(data.to_json) %>');
</script>

<!-- HTML 标签内联监听器 -->
<button
  onclick="alert('<%= Encode.forJavaScript(UNTRUSTED) %>');">
  click me
</button>

<!-- URL 参数 -->
<a href="/search?value=<%= Encode.forUriComponent(UNTRUSTED) %>&order=1#top">

<!-- URL 路径 -->
<a href="/page/<%= Encode.forUriComponent(UNTRUSTED) %>">

<!--
  URL.
  注意：要根据项目情况进行过滤，禁止掉 "javascript:" 链接、非法 scheme 等
-->
<a href='<%=
  urlValidator.isValid(UNTRUSTED) ?
    Encode.forHtml(UNTRUSTED) :
    "/404"
%>'>
  link
</a>
```

不可信数据将被放置的地方	例子	应该采取的编码	编码格式

HTML标签之间	<div> 不可信数据 </div>	HTML Entity编码	html entity 编码
HTML 支持实体编码（如 &lt; 就是 ‘<’），十进制（&#60）、十六进制（&#x3c）ASCII编码，以及unicode字符编码（&#x3c）。

HTML标签的属性里	 <input type=”text”value=” 不可信数据 ” />	    HTML Attribute编码    	&#xHH;

JavaScript标签里	<script> var msg = ” 不可信数据 ” </script>   	JavaScript编码       	\xHH
除了阿拉伯数字和字母，对其他所有的字符进行编码，只要该字符的ASCII码小于256。编码后输出的格式为 \xHH (以 \x 开头，HH则是指该字符对应的十六进制数字)
javascript 支持 八进制（\74）、十六进制（\x3c）ASCII编码，以及 unicode字符编码（\u003c）。

HTML页面的URL里	<a href=”/page?p= 不可信数据 ” >…</a>	         URL编码	            %HH  decodeURIComponent
URL 支持十六进制ASCII编码 以及 utf-8 编码 和 GB2312 编码 或者还有更多

CSS里	           <div style=” width: 不可信数据 ” > … </div>	   CSS编码	           \HH
CSS 支持十六进制ASCII编码（#fff 可以写成#\66\66\66） 以及 utf-8 编码（\0066）


- 预防 DOM 型 XSS 攻击
  - .innerHTML、.outerHTML、document.write()特别小心
  - DOM 中的内联事件监听器，如 location、onclick、onerror、onload、onmouseover 等，<a> 标签的 href 属性，JavaScript 的 eval()、setTimeout()、setInterval() 等，都能把字符串作为代码运行。如果不可信的数据拼接到字符串中传递给这些 API，很容易产生安全隐患，请务必避免

- CSP
- cookie http-only


https://juejin.im/post/6844903685122703367#heading-18