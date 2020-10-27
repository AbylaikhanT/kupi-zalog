# Introduction

Frontend of kupizalog.kz, VueJS  

## Installation

1. Clone repository

```bash
$ git clone https://github.com/daistd/kz-front
$ cd kz-front
```

2. Change branch

```bash
$ git fetch origin new_version
$ git checkout new_version
```

3. Install Javascript dependencies

```bash
$ npm install
```

4. Run server

```bash
$ npm run serve
```

5. Your application is running here: http://localhost:8080

## Deploy

```bash
$ git pull --rebase origin develop
$ npm run build
$ sudo systemctl restart nginx
```
