import Dep from "./dep.js";

class Observer {
  constructor(data) {
    this.data = data;

    this.observe(this.data);
  }

  observe(data) {
    if (data && typeof data === "object") {
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }

  defineReactive(obj, key, value) {
    this.observe(value);

    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      // 利用访问器完成数据劫持
      get: _ => {
        dep.target && dep.addWater(dep.target);
        return value;
      },
      set: newVal => {
        this.observe(newVal);
        if (newVal !== value) {
          value = newVal;
        }
        return true;
      }
    });
  }
}
export default Observer;
