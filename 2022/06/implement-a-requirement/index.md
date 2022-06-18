# 实现一个需求

最近看sqlserver官方文档的pdf，越看越觉得其中的知识点十分繁杂，众多分支无穷尽焉，让人心生畏惧。
&lt;!--more--&gt;

![1](https://cdn.jsdelivr.net/gh/jinhuaiyao/image-hosting/images/implement-a-requirement_1.png)

&lt;br&gt;

于是想着能不能有个工具，可以把pdf里的大纲提取出来，并且能够标记完成度，这样能有信心一点一点去学习，逐渐拨开层层迷雾。

一顿谷歌，发现没有现成的工具可以一步到位实现需求。不过搜索过程中发现了OmniOutliner，试用了一下，发现它界面精美，可以展示大纲并且可以标记，完美符合我的需求。

剩下的问题就是如何把pdf文档里的大纲导出然后导入OmniOutliner了。

又是一番搜索，找到了[mupdf](https://mupdf.com)，这个工具可以导出pdf大纲。         

虚拟机Windows里运行
`c:\mupdf-1.20.0-windows&gt;mutool.exe show SQLServer.pdf outline &gt;b.txt`    

![2](https://cdn.jsdelivr.net/gh/jinhuaiyao/image-hosting/images/implement-a-requirement_2.png)

&lt;br&gt;

**Mac里处理一下多余的字符**

去掉右面的#page=xxx  

`vi b.txt`

`:1,$s/#page.*$//g`

![3](https://cdn.jsdelivr.net/gh/jinhuaiyao/image-hosting/images/implement-a-requirement_3.png)

&lt;br&gt;

`:set list`

![4](https://cdn.jsdelivr.net/gh/jinhuaiyao/image-hosting/images/implement-a-requirement_4.png)

&lt;br&gt;

去除左面多余|tab和-tab以及所有的双引号  

`:1,$s/|^I//g`

![5](https://cdn.jsdelivr.net/gh/jinhuaiyao/image-hosting/images/implement-a-requirement_5.png)

&lt;br&gt;

`:1,$s/-^I//g`

![6](https://cdn.jsdelivr.net/gh/jinhuaiyao/image-hosting/images/implement-a-requirement_6.png)

&lt;br&gt;

`:1,$s/&#34;//g`

![7](https://cdn.jsdelivr.net/gh/jinhuaiyao/image-hosting/images/implement-a-requirement_7.png)

&lt;br&gt;

`:set nolist`

![8](https://cdn.jsdelivr.net/gh/jinhuaiyao/image-hosting/images/implement-a-requirement_8.png)

&lt;br&gt;

搞定!

导入OmniOutliner，看成果图，完美。  

![2](https://cdn.jsdelivr.net/gh/jinhuaiyao/image-hosting/images/implement-a-requirement_9.png)

&lt;br&gt;



