import clone from 'lodash/clone';

export default class Method {
    constructor (size, solutionFunction) {
        // Ajusta tamanho caso seja impar
        if (!(size % 2)) size = size - 1;
        // Ajusta tamanho caso seja menor que 5
        if (size < 5) size = 5;
        this.size = size;
        this.path = [];
        this.depth = 0;
        this.cost = 0;
        this.visitedTotal = 0;
        this.expandedTotal = 0;
        this.time = 0;
        this.isSolved = solutionFunction;
        const half = Math.floor(size / 2);
        this.array = [...new Array(size)].map((item, index) => {
            if (index < half) {
                return 0;
            } else if (index > half) {
                return 1;
            } else {
                return null;
            }
        });
    }
    exec () {
        console.log('Se você está vendo isso, você não sobrescreveu o método direito');
    }
    arrayIsEqual (first, second) {
        if(first && second && first.length === second.length) {
            let allTrue = true;
            for (let index in first) {
                if (allTrue === false) break;
                allTrue = first[index] === second[index];
            }
            return allTrue;
        }
        return false;
    }
    swap (array, posA, posB) {
        if (array[posA] === undefined || array[posB] === undefined) return array;
        let nArray = clone(array);
        const aux = nArray[posA];
        nArray[posA] = nArray[posB];
        nArray[posB] = aux;
        return nArray;
    }
    get stats () {
        return {
            time: this.time,
            cost: this.cost,
            visitedTotal: this.visitedTotal,
            expandedTotal: this.expandedTotal,
            depth: this.depth,
            path: this.path.map(item => {
                item[item.indexOf(null)] = 'V';
                return item.join();
            }).join(' => ')
        };
    }
}