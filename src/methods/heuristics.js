import Method from './method';
// Extende classe de Method para receber uma heurística
class Heuristics extends Method {
    constructor(size, solutionFunction, heuristics) {
        super(size, solutionFunction);
        this.heuristics = heuristics;
    }
}

export default Heuristics;