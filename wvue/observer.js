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
      // 利用访问器完成数据劫持 => 依赖收集
      get: _ => {
        Dep.target && dep.addWater(Dep.target);
        return value;
      },
      set: newVal => {
        // 对新设置的值进行监听
        this.observe(newVal);
        if (newVal !== value) {
          value = newVal;
        }
        dep.notify();
        return true;
      }
    });
  }
}
export default Observer;
