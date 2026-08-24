---
layout: page
title: 项目
permalink: /zh/projects/
lang: zh-CN
translation_url: /projects/
description: 代表性研究与工程项目。
nav: false
horizontal: false
---

<nav aria-label="中文页面导航" style="margin-bottom: 1rem;">
  <a href="{{ '/zh/' | relative_url }}">关于</a> ·
  <a href="{{ '/zh/publications/' | relative_url }}">论文</a> ·
  <strong>项目</strong> ·
  <a href="{{ '/zh/cv/' | relative_url }}">简历</a>
  <span style="float: right;"><a href="{{ '/projects/' | relative_url }}" lang="en">English</a></span>
</nav>

{% assign zh_projects = site.projects | where: "lang", "zh-CN" | sort: "importance" %}

<div class="projects">
  <div class="row row-cols-1 row-cols-md-3">
    {% for project in zh_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>
