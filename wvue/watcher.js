import compileUtil from "./utils.js";
import Dep from "./dep.js";

class Watcher {
  constructor(wm, exp, cb) {
    this.wm = wm;
    this.exp = exp;
    this.cb = cb;
    this.oldVal = this._getOldVal();
  }
  _getOldVal() {
    Dep.target = this;
    const oldVal = compileUtil.getValue(this.exp, this.wm);
    Dep.target = null;
    return oldVal;
  }
  updater() {
    const newVal = compileUtil.getValue(this.exp, this.wm);
    if (this.oldVal !== newVal) {
      this.cb(newVal);
    }
  }
}
export default Watcher;
