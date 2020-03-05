class Dep {
  constructor() {
    this.watchers = [];
  }
  addWater(w) {
    this.watchers.push(w);
  }
  notify() {
    this.watchers.forEach(w => {
      w.updater();
    });
  }
}
export default Dep;
