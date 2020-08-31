# ts-react-library

## 组件库相关
完成一个组件库需要考虑的问题
- 代码结构
- 样式解决方案
- 组件需求分析和编码
- 组件测试用例分析和编码
- 代码打包输出和发布
- CI/CD，文档生成

## React
- effect 返回一个函数可以清除 effect，它会在当前 effect 执行时清除上一个 effect，一般用于事件的绑定和卸载
- 每个自定义 hook 必须使用 use 开头的函数名
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