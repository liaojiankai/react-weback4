## 快速开始

```bash
# install dependencies
# 安装依赖，可以使用yarn/npm
[npm start]()  or   [yarn install]()

# create a multi-page entry template
# 创建多页面入口模板
npm run devNew

# serve in dev mode, with hot reload at localhost:8080
# 开发环境，带有HMR，监听8080端口
npm run dev

# build for production
# 生产环境打包
npm run build

# serve in production mode (with building)
# 生产环境服务，不带有打包
npm start
```

## 配置入口

多页面入口配置文件位于`config/entry.json5`目录下

```json
// 可新建private.js定义自己私有的配置
{
  "name": "index",
  "path": "index/Index",
  "title": "首页",
  "keywords": "首页",
  "description": "首页"
}
```
