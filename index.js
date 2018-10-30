process._debugProcess(process.pid);
import * as Methods from './methods';
import clone from 'lodash/clone';
require('./methods/depthSearch');

// 0 => Bolinha brancas
// 1 => Bolinha preta
// null => espaço vazio
let array = [0, 0, null, 1, 1];

/**
 * Objetivo do algoritmo é atingir uma forma tal que as bolas pretas estejam entre as bolas brancas
 * Formas válidas:
 * [1,0,0,1,null]
 * [1,0,0,null,1]
 * [1,0,null,0,1]
 * [1,null,0,0,1]
 * [null,1,0,0,1]
 */

/**
 * Operadores:
 * Definidos como uma função que recebe um vetor e retorna o vetor resultante após aplicar a operação
 * Operação só é aplicada se movimento for possível
 */

const ops = [
    // Primeiro operador: Bola preta anda para a esquerda
    (array) => {
        const nullPosition = array.indexOf(null);
        if (array[nullPosition + 1] === 1) { // Se temos [..., null, 1, ...] podemos executar.
            array = swap(array, nullPosition, nullPosition + 1);
        }
        return array;
    },
    // Segundo operador: Bola branca salta para a direita
    (array) => {
        const nullPosition = array.indexOf(null);
        if (array[nullPosition - 2] === 0) { // Se temos [..., 0, X, null, ...] podemos executar.
            array = swap(array, nullPosition, nullPosition - 2);
        }
        return array;
    },
    // Terceiro operador: Bola branca anda para a direita
    (array) => {
        const nullPosition = array.indexOf(null);
        if (array[nullPosition - 1] === 0) { // Se temos [..., 0, null, ...] podemos executar.
            array = swap(array, nullPosition, nullPosition - 1);
        }
        return array;
    },
    // Quarto operador: Bola preta salta para a esquerda
    (array) => {
        const nullPosition = array.indexOf(null);
        if (array[nullPosition + 2] === 1) { // Se temos [..., null, X, 1, ...] podemos executar.
            array = swap(array, nullPosition, nullPosition + 2);
        }
        return array;
    },
    // Quinto operador: Bola preta anda para a direita
    (array) => {
        const nullPosition = array.indexOf(null);
        if (array[nullPosition - 1] === 1) { // Se temos [..., 1, null, ...] podemos executar.
            array = swap(array, nullPosition, nullPosition - 1);
        }
        return array;
    },
    // Sexto operador: Bola branca salta para a esquerda
    (array) => {
        const nullPosition = array.indexOf(null);
        if (array[nullPosition + 2] === 0) { // Se temos [..., null, X, 0 ...] podemos executar.
            array = swap(array, nullPosition, nullPosition + 2);
        }
        return array;
    },
    // Sétimo operador: Bola branca anda para a esquerda
    (array) => {
        const nullPosition = array.indexOf(null);
        if (array[nullPosition + 1] === 0) { // Se temos [..., null, 0 ...] podemos executar.
            array = swap(array, nullPosition, nullPosition + 1);
        }
        return array;
    },
    // Oitavo operador: Bola preta salta para a direita
    (array) => {
        const nullPosition = array.indexOf(null);
        if (array[nullPosition - 2] === 1) { // Se temos [..., 1, X, null ...] podemos executar.
            array = swap(array, nullPosition, nullPosition - 2);
        }
        return array;
    }
];

// Funções auxiliares
function swap (array, posA, posB) {
    let nArray = clone(array);
    const aux = nArray[posA];
    nArray[posA] = nArray[posB];
    nArray[posB] = aux;
    return nArray;
}

const a = new Methods.Backtracking(array, ops);
a.exec();
console.log(a.stats);