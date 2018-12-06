import {OrderedArray, Pile} from './structures';
import Heuristics from './heuristics';
import clone from 'lodash';
class IDAStarSearch extends Heuristics {
    // Gera todos os sucessores, ordenados por h(n). Como todos tem a mesma distancia, g(n) não precisa ser considerado
    successors (node) {
        let successors = new OrderedArray((a, b) => a && b && this.heuristics(a) > this.heuristics(b));
        const nullPosition = node.indexOf(null);
        for (let index in node) {
            if (nullPosition.toString() !== index.toString()) {
                successors.push(
                    this.swap(node, index, nullPosition)
                );
            }
        }
        return successors;
    }
    // Retorna a distancia de um movimento, pulando de qualquer posição até o nulo.
    distance (start, end) {
        const nullStart = start.indexOf(null);
        const nullEnd = end.indexOf(null);
        const dist = Math.abs(nullEnd - nullStart) - 1 || 1;
        return dist;
    }
    // Executa a busca
    exec () {
        const start = new Date();
        this.doSearch();
        this.time = new Date() - start;
        this.depth = (this.path || []).length - 1;
    }
    doSearch () {
        const hash = JSON.stringify;
        // Pilha de execução
        let open = new Pile();
        // Lista de fechados
        let closed = {};
        const start = this.array;
        // Limite inicial = heuristica da raíz
        let bound = this.heuristics(start);
        let success = false, fail = false;
        // Itera pelos vários limites
        while (!success && !fail) {
            // Reinstancia o minimo para comparação dos nós excedentes
            let min = Infinity;
            closed = {};
            open.add({
                state: start,
                parent: undefined,
                total: 0
            });
            // Itera na lista de abertos atual
            while (!open.isEmpty) {
                const node = open.remove();
                this.visitedTotal++;
                // Gera novo F para o nó analisado
                const f = node.total + this.heuristics(node.state);
                // Se excede o limite
                if (f > bound) {
                    // Compara com o mínimo para atualizar o valor
                    min = f < min ? f : min;
                // Se não excede o limite e é solução
                } else if (this.isSolved(node.state)) {
                    // Marca como solução, e coloca sucesso com verdade para terminar iteração
                    closed.solution = hash(node.state);
                    success = true;
                    open = new Pile();
                } else {
                    // Caso não seja solução, gera os estados seguintes a partir dos sucessores
                    for (let successor of this.successors(node.state)) {
                        // Se nó não já está fechado
                        if (!(hash(successor) in closed)) {
                            // Expande mais um e adiciona à lista de abertos
                            this.expandedTotal++;
                            open.add({
                                state: successor,
                                parent: hash(node.state),
                                total: node.total + this.distance(successor, node.state)
                            });
                        }
                    }
                }
                // Fecha o nó atual
                closed[hash(node.state)] = node;
            }
            // Atualiza limite
            bound = min;
            // Se bound = min = Infinito => Nenhum nó foi solução e nenhum excedeu o limite => Não foi encontrada solução  
            if (bound === Infinity) fail = true;
        }
        // Se sucesso
        if (success) {
            // Reitera pela lista de fechados, adicionando os nós à solução
            const solution = closed.solution;
            let current = closed[solution];
            this.cost = current.total;
            let path = [];
            while (current.parent) {
                path.unshift(current.state);
                current = closed[current.parent];
            }
            path.unshift(current.state);
            this.path = path;
        } else {
            // Se falha, diz que falhou
            console.log(fail);
        }
    }
}

export default IDAStarSearch;