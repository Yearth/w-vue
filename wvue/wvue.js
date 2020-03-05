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
    this._proxyData(this.$data);
  }

  _initObserve() {
    new Observer(this.$data);
  }

  _initCompile() {
    new Compile(this.$el, this);
  }

  _proxyData(data) {
    for (const key in data) {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(val) {
          data[key] = val;
          return true;
        }
      });
    }
  }
}
export default Wvue;
