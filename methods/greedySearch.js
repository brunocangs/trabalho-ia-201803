import {OrderedArray} from './structures';
import Heuristics from './heuristics';

class GreedySearch extends Heuristics {
    exec() {
        const start = new Date();
        const {path, cost} = this.doSearch();
        this.path = path;
        this.depth = path.length;
        this.cost = cost;
        this.time = new Date() - start;
    }
    doSearch() {
        const hash = JSON.stringify;
        const open = new OrderedArray((a,b) => a && b && this.heuristics(a.state) < this.heuristics(b.state));
        const closed = {};
        const start = this.array;
        open.push({
            state: start,
            parent: undefined,
            total: 0
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
                for (let position in n.state) { // Itera pelo vetor de operadores: São considerados como as posições possiveis de mover em volta do nulo 
                    if(position === nullPosition) continue; // Pula operação que muda null com null
                    const next = this.swap(n.state, position, nullPosition); // Gera próximo estado
                    const distance = Math.abs(position - nullPosition) - 1 || 1; // Calcula a distancia para saltos. Se for movimento normal, distancia é 1
                    if(this.isSolved(next)) { // Checa se estado gerado é solução. Diminui um pouco eficiencia pois checa para todos expandidos, nao somente para visitados
                        this.visitedTotal++; // Se resolvido, conta mais um visitado
                        let parent = n.state;
                        let path = [parent, next];
                        parent = n.parent;
                        while(parent) { // Volta pela lista de fechados achando o caminho
                            const found = closed[hash(parent)];
                            path.unshift(found.state);
                            parent = found.parent;
                        }
                        return {path, cost: n.total + distance};
                    }
                    // Caso nao seja solução, continue expandindo
                    if(!(hash(next) in closed)) { // Se não é estado repetido
                        this.expandedTotal++;
                        // Adiciona à fila
                        open.push({
                            state: next,
                            parent: n.state,
                            total: n.total + distance
                        });
                    }
                    closed[hash(n.state)] = n;
                }
            }
        }
    }
}

export default GreedySearch;