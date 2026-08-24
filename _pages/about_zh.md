---
layout: about
title: 关于
permalink: /zh/
lang: zh-CN
translation_url: /
subtitle: 北京邮电大学 · 大语言模型与人工智能安全

profile: false
selected_papers: false
social: false

announcements:
  enabled: false

latest_posts:
  enabled: false
---

<nav aria-label="中文页面导航" style="margin-bottom: 1rem;">
  <strong>关于</strong> ·
  <a href="{{ '/zh/publications/' | relative_url }}">论文</a> ·
  <a href="{{ '/zh/projects/' | relative_url }}">项目</a> ·
  <a href="{{ '/zh/cv/' | relative_url }}">简历</a>
  <span style="float: right;"><a href="{{ '/' | relative_url }}" lang="en">English</a></span>
</nav>

![张原赫照片]({{ '/assets/img/prof_pic.jpg' | relative_url }}){: .z-depth-1 .rounded style="float:right;width:10%;min-width:72px;height:auto;margin:0 0 1rem 1.5rem" }

我是**张原赫（Yuanhe Zhang）**，目前在[北京邮电大学](https://www.bupt.edu.cn/)开展研究，研究方向聚焦于大语言模型及智能体系统的安全性、可靠性与可信部署。

近期研究主要包括大语言模型资源消耗攻击与防御、多智能体与模型上下文协议（MCP）系统中的安全风险，以及大音频语言模型和大视觉语言模型的鲁棒性。

## 研究方向

- 大语言模型
- 人工智能安全与大语言模型安全
- 智能体及多智能体系统安全
- 多模态模型鲁棒性

## 当前研究

我关注先进语言模型和多模态模型在对抗环境或资源受限场景中的失效机制，并致力于研究面向可信部署的实用防御方法。

## 学术主页

- [Google Scholar](https://scholar.google.com/citations?user=t1YN_XUAAAAJ&hl=zh-CN)
- [GitHub](https://github.com/shuita2333)

## 代表性论文

<div class="publications">
  {% bibliography --group_by none --query @*[selected=true]* %}
</div>

<script src="{{ '/assets/js/semantic-scholar-citations.js' | relative_url }}" defer></script>
