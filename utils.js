import Watcher from "./watcher.js";

const compileUtil = {
  text(node, exp, wm) {
    this.bind(node, exp, wm, "text");
  },

  html(node, exp, wm) {
    this.bind(node, exp, wm, "html");
  },

  module(node, exp, wm) {
    this.bind(node, exp, wm, "module");
  },

  on(node, exp, wm, event) {
    const fn = wm.$options.methods && wm.$options.methods[exp];
    node.addEventListener(event, fn.bind(wm), false);
  },

  bind(node, exp, wm, dir) {
    const value = this.getValue(exp, wm);
    const updaterFn = updaterUtil[dir];
    updaterFn && updaterFn(node, value);
    new Watcher(wm, exp, value => {
      updaterFn && updaterFn(node, value);
    });
  },

  getValue(exp, wm) {
    return exp.split(".").reduce((d, c) => {
      return d[c];
    }, wm.$data);
  }
};

const updaterUtil = {
  text(node, value) {
    node.textContent = value;
  },
  html(node, value) {
    node.innerHTML = value;
  },
  module(node, value) {
    node.value = value;
  }
};

export default compileUtil;
