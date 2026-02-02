---
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
description: 
img:
date: '{{ .Date }}'
lastmod: '{{ .Date }}'
draft: true
categories: {{ index (split .File.Dir "/") 1 }}
tags:
---
