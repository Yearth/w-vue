class Dep {
  constructor() {
    this.watchers = [];
  }
  addWater(w) {
    this.watchers.push(w);
  }
  notify() {
    /**
     * @description: 通知观察者进行视图更新
     */
    this.watchers.forEach(w => {
      w.updater();
    });
  }
}
export default Dep;
