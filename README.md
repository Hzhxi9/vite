一、 vite 介绍

1. vite 是一个开发构建工具, 开发过程中它利用浏览器(native ES Module)[https://caniuse.com/es6-module-dynamic-import]特性导入组织代码, 生产中利用 rollup 作为打包工具

2. 特点如下

   - 光速启动
   - 热模块替换
   - 按需编译

3. 浏览器支持

   - 开发环境: vite 需要在支持(原生 ES 模块动态导入)[https://caniuse.com/es6-module-dynamic-import]的浏览器中使用
   - 生产环境: 默认支持的浏览器需要支持 通过[脚本标签来引入原生 ES 模块](https://caniuse.com/es6-module) 。可以通过官方插件[@vitejs/plugin-legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)支持旧浏览器。

二、搭建 vite 项目

> 兼容性注意: vite 需要 NodeJS 版本 >= 12.0.0

1. 使用 npm

```shell
npm init @vitejs/app
```

2. 使用 yarn

```shell
yarn create @vitejs/app
```

3. 通过附加命令行直接指定项目名称和想要使用的模板

```shell
# npm 6.x
npm init @vitejs/app my-vue-app --template vue

# npm 7+, 需要额外的双横线
npm init @vitejs/app my-vue-app -- --template vue

# yarn
yarn create @vitejs/app my-vue-app --template vue
```

三、 index.html 与 项目根目录

1. index.html 在项目最外层而不是在 public 文件夹内的原因

   在开发期间 vite 是一个服务器, 而 index.html 是该 vite 项目的入口文件

2. vite 将 index.html 视为源码和模块图的一部分

   - vite 解析`<script type="module" src="..."> `指向 JavaScript 源码
   - 内联引入 JavaScript 的 `<script type="module" src="...">` 和引用 CSS 的`<link href>`也能利用 Vite 特有的功能被解析
   - index.html 中的 URL 将被自动转换，因此不再需要 %PUBLIC_URL% 占位符了。

3. 与静态 HTTP 服务器类似，Vite 也有 “根目录” 的概念，即文件被提供的位置

   - 源码中的绝对 URL 路径将以项目的 “根” 作为基础来解析，因此你可以像在普通的静态文件服务器上一样编写代码
   - Vite 还能够处理依赖关系，解析处于根目录外的文件位置，这使得它即使在基于 monorepo 的方案中也十分有用。

4. Vite 也支持多个 .html 作入口点的[多页面应用模式](https://vitejs.cn/guide/build.html#%E5%A4%9A%E9%A1%B5%E9%9D%A2%E5%BA%94%E7%94%A8%E6%A8%A1%E5%BC%8F)
