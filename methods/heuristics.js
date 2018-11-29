import Method from './method';

class Heuristics extends Method {
    constructor(size, solutionFunction, heuristics) {
        super(size, solutionFunction);
        this.heuristics = heuristics;
    }
}

export default Heuristics;