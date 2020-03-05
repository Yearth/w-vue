import compileUtil from "./utils.js";

class Compile {
  constructor(el, wm) {
    this.el = this._isElementNode(el) ? el : document.querySelector(el);
    this.wm = wm;

    const fragment = this.node2Fragment(this.el);
    this.compile(fragment);
    this.el.append(fragment);
  }

  compileElementNode(node) {
    const attrs = node.attributes;
    [...attrs].forEach(attr => {
      const { name, value } = attr;
      if (this._isDirective(name)) {
        const [, directive] = name.split("-");
        const [dir, event] = directive.split(":");
        compileUtil[dir](node, value, this.wm, event);
        node.removeAttribute(`v-${directive}`);
      }
    });
  }

  compileTextNode(node) {
    const txt = node.textContent;
    const reg = /\{\{(.*)\}\}/;

    if (reg.test(txt)) {
      compileUtil["text"](node, RegExp.$1.trim(), this.wm);
    }
  }

  compile(node) {
    const childNodes = node.childNodes;
    [...childNodes].forEach(child => {
      if (this._isElementNode(child)) {
        this.compileElementNode(child);
      } else {
        this.compileTextNode(child);
      }
      // get all childnodes
      if (child.childNodes && child.childNodes.length) {
        this.compile(child);
      }
    });
  }

  node2Fragment(el) {
    const f = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      f.append(firstChild);
    }
    return f;
  }

  _isDirective(name) {
    return name.startsWith("v-");
  }

  _isElementNode(node) {
    return node.nodeType === 1;
  }
}

export default Compile;
