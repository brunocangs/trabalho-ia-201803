import Method from './method';
import clone from 'lodash/clone';

export default class Backtracking extends Method {
    exec () {
        const start = new Date();
        let initial = clone(this.array);
        let solution = [initial];
        this.path = this.doBacktrack(solution);
        const end = new Date();
        this.time = end - start;
    }
    doBacktrack (array) {
        const top = array.slice(-1)[0]; // Ultimo elemento
        for (let operator of this.operators) { // Para todos os operadores
            const next = operator(top); // Gera o estado seguinte ao atual (ultima posição) com o operador
            // Todos os expandidos são visitados, não expande antes de visitar
            this.expandedTotal++;
            this.visitedTotal++;
            if (this.isSolved(next)) return array.concat([next]); // Se achou solução, retorna o caminho
            if (array.findIndex(item => this.arrayIsEqual(item, next)) > -1) continue; // Se estado já esta na solução, passe para o proximo
            let newArray = array.concat([next]);
            const result = this.doBacktrack(newArray); // Se gerou um estado novo, continue a partir do proximo estado
            if (result) return result; // Se recursão retornou uma solução, retorne ela 
        }
        return null; // Se testou todos operadores e nenhum retornou sucesso, retorne null
    }
}