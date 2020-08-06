import Watcher from './watcher.js'

// 暗号：老师：西瓜西瓜我是冬瓜
// 暗号：助教：冬瓜冬瓜我是西瓜
const compileUtil = {
  text(node, exp, wm) {
    this.bind(node, exp, wm, 'text')
  },

  html(node, exp, wm) {
    this.bind(node, exp, wm, 'html')
  },

  // ? 实现双向数据绑定
  module(node, exp, wm) {
    this.bind(node, exp, wm, 'module')
    // 获取现在的 value 值
    const curValue = this.getValue(exp, wm)
    // 添加 input 事件监听
    node.addEventListener('input', (e) => {
      const newValue = e.target.value
      // 当新值和当前值不一样的时候，触发修改
      if (curValue !== newValue) {
        this.setValue(exp, wm, newValue)
      }
    })
  },

  on(node, exp, wm, event) {
    const fn = wm.$options.methods && wm.$options.methods[exp]
    node.addEventListener(event, fn.bind(wm), false)
  },

  bind(node, exp, wm, dir) {
    const value = this.getValue(exp, wm)
    const updaterFn = updaterUtil[dir]
    updaterFn && updaterFn(node, value)
    new Watcher(wm, exp, (value) => {
      updaterFn && updaterFn(node, value)
    })
  },

  getValue(exp, wm) {
    return exp.split('.').reduce((d, c) => d[c], wm.$data)
  },

  setValue(exp, wm, value) {
    exp.split('.').forEach((k, i) => {
      if (i < exp.length - 1) {
        wm = wm[k]
      } else {
        wm[k] = value
      }
    })
  },
}

const updaterUtil = {
  text(node, value) {
    node.textContent = value
  },
  html(node, value) {
    node.innerHTML = value
  },
  module(node, value) {
    console.log({ node, value })

    node.value = value
  },
}

export default compileUtil
