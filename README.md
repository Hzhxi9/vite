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

四、 命令行界面

1. 在 npm scripts 中使用 vite 可执行文件

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器
    "build": "vite build", // 为生产环境构建产物
    "serve": "vite preview" // 本地浏览生产构建产物
  }
}
```

2. 直接使用`npx vite` 运行

3. 可以指定额外的命令行选项: --port 或者 --https, 运行 `npx vite --help`获得完整的命令行选项列表

五、代码组织形式分析

1. 关键变化是`index.html`中的入口文件导入方式

![导入方式](./images/vite_1.awebp)

2. 这样`main.js`就可以使用 ES6 Module 方式组织代码

![mainjs](./images/vite_2.awebp)

3. 浏览器会自动加载这些导入, vite 会启动一个本地服务器处理这些不同加载请求. 对于相对地址的导入, 要根据后缀名处理文件内容并返回, 对于裸模块导入要修改它的路径为相对地址并在此请求处理

![浏览器处理](./images/vite_3.awebp)

4. 在根据模块 package.json 中的入口文件选项获取要加载的文件。

![package.json](./images/vite_4.awebp)

六、 资源加载方式解析

1. 直接导入 css 文件

vite 中可以直接导入`.css`文件, 样式将影响导入的页面, 最终会被打包到 style.css

> 在我们程序中，除了全局样式大部分样式都是以形式存在于 SFC 中

```js
import { createApp } from 'vue';
import App from './App.vue';

import './index.css';
```

2. Scoped CSS

```css
<style scoped>
/***/
</style>
```

3. CSS Module: SFC 中使用 CSS Module 

任何以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件。导入这样的文件会返回一个相应的模块对象

```html
<style module>
  /***/
</style>
```

```css
/* example.module.css */
.red {
  color: red;
}
```

CSS modules 行为可以通过 [css.modules 选项](https://vitejs.cn/config/#css-modules)进行配置

如果 css.modules.localsConvention 设置开启了 camelCase 格式变量名转换（例如 localsConvention: 'camelCaseOnly'）， 你还可以使用按名导入。

```js
// .apply-color -> applyColor
import { applyColor } from './example.module.css';
document.getElementById('foo').className = applyColor;
```

> 请注意 CSS modules localsConvention 默认是 camelCaseOnly - 例如一个名为 .foo-bar 的类会被暴露为 classes.fooBar

举个例子: 修改组件样式为 CSS Module 形式

```css
<style module>
.message-box {
   padding: 10px 20px;
   background: #ff0;
   border: 1px solid #42b;
   color: #fff;
}
.message-box-close {
   float: right;
   cursor: pointer;
}
</style>
```

```html
<div :class="$style.messageBox">
  <h3>
    <!-- 具名插槽 -->
    <slot name="title"/>
    <span :class="$style.messageBoxClose" @click="$emit('close')">
  </h3>
</div>
```

js 中导入 CSS Module: 将 css 文件命名为`*.module.css`即可

```js
import style from './Message.module.css';

export default {
  emits: ['close'],
  computed: {
    $style() {
      return style;
    },
  },
};
```
