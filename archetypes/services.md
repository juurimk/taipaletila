---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
slug: "{{ .Name }}"
type: "services"
layout: "single"

# Service specific parameters
params:
  slug: "{{ .Name }}"
---

<!-- This content will be overridden by the services.yml data file -->
<!-- The actual content is managed through data/services.yml -->
<!-- This file exists mainly for Hugo's content management and URL generation -->