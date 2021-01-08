# 多用途课程项目前端

本前端基于 [Ant Design Pro](https://pro.ant.design) 构建。下面是其使用方式简介：

## 环境配置

安装 `node_modules`:

```bash
npm install
```

或者

```bash
yarn
```

## 使用预置脚本

Ant Design Pro 提供了若干脚本，以便开发者快速启动并构建 Web 项目、进行代码风格检查和测试。 

这些脚本位于 `package.json` 中。开发者可以自行修改或增添脚本：

### 启动项目

```bash
npm start
```

### 构建项目

```bash
npm run build
```

### 检查代码风格

```bash
npm run lint
```

可以使用下述脚本来自动修复部分风格错误：

```bash
npm run lint:fix
```

### 代码测试

```bash
npm test
```

## 部署

使用 `Nginx` 部署时，`Nginx` 的配置文件可以按如下方式填写（方括号（`MSIE [1-6]` 除外）及其中内容需要自行更改）：

```
server {
    include mime.types;
    listen [YOUR_LISTEN_PORT];
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    root [YOUR_FRONTEND_DIST_DERECTORT];
    location / {
        try_files $uri $uri/ /index.html;
    }
    location /api {
        proxy_pass http://[YOUR_BACKEND_SERVER_IP]:[YOUR_BACKEND_SERVER_PORT];
        proxy_set_header   X-Forwarded-Proto $scheme;
        proxy_set_header   Host              $http_host;
        proxy_set_header   X-Real-IP         $remote_addr;
    }
}
```

## 更多信息

可以访问[ Ant Design Pro 官网](https://pro.ant.design)来获取更多相关信息。要向 Ant Design Pro 反馈信息，请在其[ Github 仓库](https://github.com/ant-design/ant-design-pro)处留言。
