import {OrderedArray, Pile} from './structures';
import Heuristics from './heuristics';
import clone from 'lodash';
class IDAStarSearch extends Heuristics {
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
    distance (start, end) {
        const nullStart = start.indexOf(null);
        const nullEnd = end.indexOf(null);
        const dist = Math.abs(nullEnd - nullStart) - 1 || 1;
        return dist;
    }
    exec () {
        const start = new Date();
        this.doSearch();
        this.time = new Date() - start;
        this.depth = (this.path || []).length - 1;
    }
    doSearch () {
        const hash = JSON.stringify;
        let open = new Pile();
        let closed = {};
        const start = this.array;
        let bound = this.heuristics(start);
        let success = false, fail = false;
        while (!success && !fail) {
            let min = Infinity;
            closed = {};
            open.add({
                state: start,
                parent: undefined,
                total: 0
            });
            while (!open.isEmpty) {
                const node = open.remove();
                this.visitedTotal++;
                const f = node.total + this.heuristics(node.state);
                if (f > bound) {
                    min = f < min ? f : min;
                } else if (this.isSolved(node.state)) {
                    closed.solution = hash(node.state);
                    success = true;
                    open = new Pile();
                } else {
                    for (let successor of this.successors(node.state)) {
                        if (!(hash(successor) in closed)) {
                            this.expandedTotal++;
                            open.add({
                                state: successor,
                                parent: hash(node.state),
                                total: node.total + this.distance(successor, node.state)
                            });
                        }
                    }
                }
                closed[hash(node.state)] = node;
            }
            bound = min;
            if (bound === Infinity) fail = true;
        }
        if (success) {
            const solution = closed.solution;
            let current = closed[solution];
            this.cost = current.total;
            let path = [];
            debugger;
            while (current.parent) {
                path.unshift(current.state);
                current = closed[current.parent];
            }
            path.unshift(current.state);
            this.path = path;
        } else {
            console.log(fail);
        }
    }
}

export default IDAStarSearch;