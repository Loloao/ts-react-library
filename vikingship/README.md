# ts-react-library

## 组件库相关

完成一个组件库需要考虑的问题

- 代码结构
- 样式解决方案
- 组件需求分析和编码
- 组件测试用例分析和编码
- 代码打包输出和发布
- CI/CD，文档生成

组件库样式变量分类
最好添加很多变量，变量越多，可定制化程度越多，不要怕麻烦

- 基础色彩系统
  - 系统色板 - 基础色板 + 中性色板
  - 产品色板 - 品牌色 + 功能色板
    - 品牌色一般由两种构成，也可以是一种，比如可口可乐是红色和白色
    - 功能色板表示辅助色，比如成功，失败，警告等等
- 字体系统
- 表单
- 按钮
- 边框和阴影
- 可配置开关

## React

- effect 返回一个函数可以清除 effect，它会在当前 effect 执行时清除上一个 effect，一般用于事件的绑定和卸载
- 每个自定义 hook 必须使用 use 开头的函数名
- React 为什么适合单元测试
  - Component 组件化
  - Function 组件都是函数式组件
  - 单向数据流
- `setupTests.ts`是在测试之前需要运行的内容

## css

- scss 文件以`_`开头表示是一个 partial 文件，只能被导入，而不能被单独编译
- SVG 作为 Icon 图的优势
  - 完全可控
  - SVG 即取即用，Font Icon 要下载全部字体文件
  - Font Icon 还有很多奇怪的 Bug，比如在浏览器没有下载完字体文件的时会渲染成各种各样的字符
  - react-fontawesome

### 其他知识点

- `Fetch`缺点
  - 只对网络请求报错，对 400，500 都当做成功请求
  - 默认不带 cookie
  - 不支持 abort，不支持超时控制
  - 没有办法原生检测请求的进度

### 技巧

- 可以用`useRef`来判断组件是否是首次挂载而不是更新

```typescript
const didMountRef = useRef(false)
useEffect(() => {
  if (didMountRef) {
    console.log('this is updated')
  } else {
    didMountRef.current = true
  }
})
```

- 使用[storyBook](https://storybook.js.org)来进行组件的展示和文档编写

  - `storybook-addon-info`进行文档的编写
  - `react-docgen`进行文档的自动生成，它需要`react-docgen-typescript-loader`设置在 webpack 中

- 使用`json-placeholder`

- `Omit`可以忽略类型中的一个属性值
- `Upload`一个文件的生命周期，`开始`-`beforeUpload(file)`-`onProgress(event, file)`-`onChange(file)`-`onError or onSuccess`-`onRemoved(file)（删除已上传文件）`
