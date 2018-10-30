class Queue {
    constructor() {
        this.array = [];
    }
    add (item) {
        this.array.push(item);
    }
    remove () {
        this.array.shift();
    }
}

class Pile {
    constructor() {
        this.array = [];
    }
    add (item) {
        this.array.unshift(item);
    }
    remove () {
        this.array.shift();
    }
}

export {Queue, Pile};