import Compile from "./compile.js";
import Observer from "./observer.js";

class Wvue {
  constructor(options = {}) {
    this.$options = options;
    this.$el = options.el;
    this.$data = options.data;

    if (!this.$el) throw new Error("请指定挂载点");

    this._initObserve();
    this._initCompile();
  }

  _initCompile() {
    new Compile(this.$el, this);
  }

  _initObserve() {
    new Observer(this.$data);
  }
}
export default Wvue;
