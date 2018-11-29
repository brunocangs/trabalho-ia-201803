import {Pile} from './structures';
import Method from './method';

class DepthSearch extends Method {
    exec() {
        const start = new Date();
        this.path = this.doSearch();
        this.time = new Date() - start;
        this.depth = (this.path || []).length;
        this.cost = this.depth - 1;
    }
    doSearch() {
        const hash = JSON.stringify;
        const open = new Pile();
        const closed = {};
        const start = this.array;
        open.add({
            state: start,
            parent: undefined
        });
        let fail;
        while(!fail) { // Somente para evitar loop infinito
            if(open.isEmpty) {
                fail = true;
            } else {
                let n = open.remove(); // Remove primeiro da pilha
                this.visitedTotal++; // Conta como nova visita
                // Para todos os operadores
                if(hash(n.state) in closed) continue; // Se estado já está fechado nao expande
                const nullPosition = n.state.indexOf(null); // Posição do nulo
                for (let position of [-1, -2, 2, 1].reverse()) { // Itera pelo vetor de operadores: São considerados como as posições possiveis de mover em volta do nulo 
                    const next = this.swap(n.state, nullPosition + position, nullPosition); // Gera próximo estado
                    if(this.isSolved(next)) { // Checa se estado gerado é solução. Diminui um pouco eficiencia pois checa para todos expandidos, nao somente para visitados
                        this.visitedTotal++; // Se resolvido, conta mais um visitado
                        let parent = n.state;
                        let path = [parent, next];
                        parent = n.parent;
                        while(parent) { // Reitera pela lista de fechados para montar o caminho
                            const found = closed[hash(parent)];
                            path.unshift(found.state);
                            parent = found.parent;
                        }
                        return path; // n.path.concat([next]); // Retorna caminho até o nó, contando com o de solução
                    }
                    // Caso nao seja solução, continue expandindo
                    if(!(hash(next) in closed)) { // Se não é estado repetido
                        this.expandedTotal++;
                        // Adiciona à fila
                        open.add({
                            state: next,
                            parent: n.state
                        });
                    }
                    closed[hash(n.state)] = n;
                }
            }
        }
    }
}
export default DepthSearch;
