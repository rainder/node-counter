'use strict';

const PREVIOUS$ = Symbol();
const TIMER$ = Symbol();

module.exports = class Counter {
  constructor() {
    this.total = {};
    this.per_sec = {};
    this[PREVIOUS$] = {};

    this[TIMER$] = setInterval(() => this._calculateDataPerSec(this), 1000).unref();
  }

  /**
   *
   * @private
   */
  _calculateDataPerSec() {
    for (let key of Object.keys(this.total)) {
      const previousValue = this[PREVIOUS$][key] || 0;
      
      this[PREVIOUS$][key] = this.total[key];
      this.per_sec[key] = this.total[key] - previousValue;
    }
  }

  /**
   *
   */
  destroy() {
    clearInterval(this[TIMER$]);
  }

  /**
   *
   * @param key {string}
   * @param amount {number}
   */
  inc(key, amount = 1) {
    this.total[key] = (this.total[key] || 0) + amount;
  }
}
