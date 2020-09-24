## react-redux

### connect
mapState: 返回一个对象 react-redux 会进行浅比较，阻止re-render

### useSelector
对上一次返回的值和这一次返回的值，进行引用比较，只要不相等就会 re-render

所以如果useSelector返回一个新对象，那么每次都会re-render

如果你需要从 store 里面取出多个值，官方建议是：
- 多次 useSelector，每个 useSelector 只返回一个值，避免直接返回一个对象
- Reselect
- shallowEqual



