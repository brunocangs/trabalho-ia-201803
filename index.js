process._debugProcess(process.pid);
import * as Methods from './methods';
import {OrderedArray} from './methods/structures';

// 0 => Bolinha brancas
// 1 => Bolinha preta
// null => espaço vazio
// [0, ..., 0, null, 1, ..., 1]

/**
 * Objetivo do algoritmo é atingir uma forma tal que as bolas pretas estejam envolvendo as bolas brancas
 */

const solutionWhiteBetweenBlack = (array) => {
    const filtered = array.filter(item => item !== null);
    //     Começa com 1      && Termina com 1 => [1,...,1] => Pretas envolvendo brancas
    return filtered[0] === 1 && filtered[filtered.length - 1] === 1;
};

const solutionSwapAll = (array) => {
    const half = Math.floor(array.length / 2);
    for (let index = 0; index < array.length; index++) {
        if (index < half && array[index] === 0) return false;
        if (index > half && array[index] === 1) return false;
        if (index === half && array[index] !== null) return false;
    }
    return true;
};

const a = new Methods.Backtracking(7, solutionWhiteBetweenBlack);
a.exec();
console.log(a.stats);

const b = new Methods.Backtracking(7, solutionSwapAll);
b.exec();
console.log(b.stats);

const c = new Methods.DepthSearch(7, solutionWhiteBetweenBlack);
c.exec();
console.log(c.stats);

const d = new Methods.DepthSearch(7, solutionSwapAll);
d.exec();
console.log(d.stats);

const e = new Methods.WidthSearch(7, solutionWhiteBetweenBlack);
e.exec();
console.log(e.stats);

const f = new Methods.WidthSearch(7, solutionSwapAll);
f.exec();
console.log(f.stats);

const g = new Methods.OrderedSearch(7, solutionWhiteBetweenBlack);
g.exec();
console.log(g.stats);

const h = new Methods.OrderedSearch(7, solutionSwapAll);
h.exec();
console.log(h.stats);