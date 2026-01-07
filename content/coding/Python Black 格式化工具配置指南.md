---
title: "Python Black 格式化工具配置指南"
date: 2026-01-04T16:58:05+08:00
lastmod: 2026-01-04T16:58:05+08:00
author: "bookyzhou"
---


## 安装 Black

使用 python 解释器版本对应的 pip 安装 black

```bash
which python
which python3
python --version
python3 --version
python3.8 -m pip install black
python3.8 -m pip show black
which black
```

## 配置 setting.json

```json
{
  "black-formatter.path": [
    "/data/mm64/bookyzhou/user-deduction/python3.8_venv/bin/black"
  ],
  "editor.defaultFormatter": "ms-python.flake8",
  "notebook.defaultFormatter": "ms-python.flake8",
  "editor.formatOnSave": true
}
```

## 配置 setup.cfg

```cfg
[flake8]
ignore =
    ;W503 line break before binary operator
    W503,
    ;E203 whitespace before ':'
    E203,

; exclude file
exclude =
    .tox,
    .git,
    __pycache__,
    build,
    dist,
    *.pyc,
    *.egg-info,
    .cache,
    .eggs

max-line-length = 120
```
