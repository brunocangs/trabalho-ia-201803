class Queue {
    constructor(array) {
        this.array = array || [];
    }
    add (item) {
        return this.array.push(item);
    }
    remove () {
        return this.array.shift();
    }
    at (index) {
        return this.array[index];
    }
    get findIndex() {
        return this.array.findIndex;
    }
    get top () {
        return this.array[0];
    }
    get isEmpty () {
        return this.array.length === 0;
    }
}

class Pile {
    constructor(array) {
        this.array = array || [];
    }
    add (item) {
        return this.array.unshift(item);
    }
    remove () {
        return this.array.shift();
    }
    at (index) {
        return this.array[index];
    }
    get findIndex() {
        return this.array.findIndex;
    }
    get top () {
        return this.array[0];
    }
    get isEmpty () {
        return this.array.length === 0;
    }
}

class OrderedArray extends Array {
    constructor(method) {
        super();
        Object.defineProperty(this, 'method', {
            value: method,
            enumerable: false
        });
    }
    push(...items) {
        for (let item of items) {
            let index = -1;
            while(this.method(this[++index], item));
            this.splice(index, 0, item);
        }
        return this.length;
    }
}

export {Queue, Pile, OrderedArray};