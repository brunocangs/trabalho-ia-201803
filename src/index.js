process._debugProcess(process.pid);
import * as Methods from './methods';
import fs from 'fs';
import csv from 'fast-csv';

var csvStream = csv.createWriteStream({headers: true, delimiter: ';'});
let writableStream = fs.createWriteStream('stats.csv');
writableStream.on('finish', function () {
    console.log('DONE!');
});
csvStream.pipe(writableStream);
// const csvStream = csv.createWriteStream({headers: true}).pipe(ws);
// const ws = fs.createWriteStream('stats.csv');
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

const heuristicsWhiteBetweenBlack = (array) => {
    let quant = 0;
    let i = -1;
    while (array[++i] != 1) if (array[i] !== null) quant++;
    i = array.length;
    while (array[--i] !== 1) if (array[i] !== null) quant++;
    return quant;
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

const heuristicsSwapAll = (array) => {
    let quant = 0;
    let index = -1;
    const half = Math.floor(array.length / 2);
    while (array[++index] !== undefined) {
        if (index < half && array[index] !== 1) quant++;
        if (index > half && array[index] !== 0) quant++;
        if (index === half && array[index] !== null) quant++;
    }
    return quant;
};

const solutions = [solutionWhiteBetweenBlack, solutionSwapAll];
const heristics = [heuristicsWhiteBetweenBlack, heuristicsSwapAll];

let stats = [];

for (let size = 2; size < 5; size++) {
    for (let name in Methods) {
        for (let i in solutions) {
            const method = new Methods[name](size * 2 + 1, solutions[i], heristics[i]);
            method.exec();
            csvStream.write({
                name, 
                size: size*2+1, 
                solution: i === '0' ? 'Brancas entre pretas' : 'Inverter posicao',
                ...method.stats
            });
        }
    }
}

csvStream.end();