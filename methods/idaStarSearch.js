import {OrderedArray} from './structures';
import Heuristics from './heuristics';

class IDAStarSearch extends Heuristics {
    f (n) {
        return n.total + this.heuristics(n.state);
    }
    exec () {
        const start = new Date();
        const {path, cost} = this.doSearch();
        this.time = new Date() - start;

    }
    doSearch () {
        let open, success, closed, discarted, patamar, patamarOld, hash, start;
        start = this.array;
        success = false;
        hash = JSON.stringify;
        open = new OrderedArray((a, b) => a && b && this.f(a) < this.f(b));
        discarted = new OrderedArray((a, b) => a && b && this.f(a) < this.f(b));
        closed = {}
        open.push({
            state: start,
            parent: undefined,
            total: 0
        });
        patamar = this.f({state: this.array, total: 0});
        patamarOld = -1;
        debugger;
        while (!open.isEmpty && patamar !== patamarOld && !success) {
            let top = open.remove();
            if (this.isSolved(top.state)) {
                success = top.state;
            } else {
                if (this.f(top) > patamar) {
                    discarted.push(top);
                }
                const nullPosition = top.state.indexOf(null);
                for (let index in top.state) {
                    if (top.state[index] === nullPosition) continue;
                    const next = this.swap(top.state, nullPosition, index);
                    if (hash(next) in closed) continue;
                    const distance = Math.abs(index - nullPosition) - 1 || 1; // Calcula a distancia para saltos. Se for movimento normal, distancia é 1
                    open.push({
                        state: next,
                        parent: hash(top.state),
                        total: top.total + distance
                    });
                }
                closed[hash(top.state)] = top;
            }
            if (open.isEmpty) {
                patamarOld = patamar;
                patamar = discarted.reduce((prev, item) => {
                    if (item < prev) return item;
                    return prev;
                }, Number.MAX_SAFE_INTEGER);
                open = discarted;
                discarted = new OrderedArray((a, b) => a && b && this.f(a) < this.f(b));
            }
        }
        return {path: success};
    }
}

export default IDAStarSearch;