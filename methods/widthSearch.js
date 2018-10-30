import {Queue} from './structures';
import Method from './method';

class WidthSearch extends Method {
    exec() {
        const start = new Date();
        this.path = this.doSearch();
        this.time = new Date() - start;
        this.cost = this.depth = this.path.length;
    }
    doSearch() {
        const open = new Queue();
        const closed = [];
        const start = this.array;
        open.add({
            state: start,
            path: [start]
        });
        let fail;
        while(!fail) { // Somente para evitar loop infinito
            if(open.isEmpty) {
                fail = true;
            } else {
                let n = open.remove(); // Remove primeiro da pilha
                this.visitedTotal++; // Conta como nova visita
                // Para todos os operadores
                for (let operator of this.operators.reverse()) { // Inverte o vetor para que operador[0] seja o topo da pilha e 
                    const next = operator(n.state); // Gera próximo estado
                    if(this.isSolved(next)) { // Checa se estado gerado é solução. Diminui um pouco eficiencia pois checa para todos expandidos, nao somente para visitados
                        this.visitedTotal++; // Se resolvido, conta mais um visitado
                        return n.path.concat([next]); // Retorna caminho até o nó, contando com o de solução
                    }
                    // Caso nao seja solução, continue expandindo
                    this.expandedTotal++;
                    if(n.path.findIndex(item => this.arrayIsEqual(item, next)) === -1) { // Se não é estado repetido
                        // Adiciona à fila
                        open.add({
                            state: next,
                            path: n.path.concat([next])
                        });
                    }
                }
                // Fecha nó atual. Lista de fechado não tem utilidade, dado que temos o caminho na iteração
                closed.push(n);
            }
        }
    }
}

export default WidthSearch;