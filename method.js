export default class Method {
    constructor(array, operators) {
        this.path = [];
        this.depth = 0;
        this.cost = 0;
        this.visitedTotal = 0;
        this.expandedTotal = 0;
        this.array = array;
        this.time = 0;
        this.operators = operators;
    }
    exec () {
        console.log('Se você está vendo isso, você não sobrescreveu o método direito');
    }
    isSolved (array) {
        const solution = [1,0,0,1]; 
        const current = array.filter(item => item !== null);
        return this.arrayIsEqual(solution, current);
    }
    arrayIsEqual(first, second) {
        return first.length === second.length && first.every((item, index) => item === second[index]);
    }
}