export class Counter {
  counter: number;

  constructor(currentCount: number = 0) {
    this.counter = currentCount;
    localStorage.setItem("counter", this.counter.toString());
  }

  increment() {
    this.counter++;
    localStorage.setItem("counter", this.counter.toString());
  }

  getCounter() {
    return this.counter;
  }
}
