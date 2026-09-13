---
layout: page
title: Projects
permalink: /projects/
description: Embedded systems, robotics, and computer vision — from research to working systems.
nav: true
nav_order: 1
display_categories: [academic, professional, personal]
---

<div class="project-index">
{% if site.enable_project_categories and page.display_categories %}
  <nav class="project-index-nav" aria-label="Project categories">
    {% for category in page.display_categories %}
      {% assign category_projects = site.projects | where: "category", category %}
      {% if category_projects.size > 0 %}
        <a href="#{{ category | slugify }}">{{ category | capitalize }} <span>{{ category_projects.size }}</span></a>
      {% endif %}
    {% endfor %}
  </nav>

{% for category in page.display_categories %}
{% assign categorized_projects = site.projects | where: "category", category %}
{% assign sorted_projects = categorized_projects | sort: "importance" %}
{% if sorted_projects.size > 0 %}
<section class="project-group" aria-labelledby="{{ category | slugify }}">
<header class="project-group-heading">
<h2 id="{{ category | slugify }}">{{ category | capitalize }}</h2>
<p>{{ sorted_projects.size }} {% if sorted_projects.size == 1 %}project{% else %}projects{% endif %}</p>
</header>
<div class="project-list">
{% for project in sorted_projects %}
{% include projects.liquid %}
{% endfor %}
</div>
</section>
{% endif %}
{% endfor %}
{% else %}
{% assign sorted_projects = site.projects | sort: "importance" %}
  <div class="project-list">
    {% for project in sorted_projects %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
{% endif %}
</div>
