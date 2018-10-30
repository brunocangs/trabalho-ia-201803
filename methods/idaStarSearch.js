import {Queue, Pile} from './structures';
import Method from './method';

class IDAStarSearch extends Method {
    exec() {
        console.log('overwritten');
    }
    doSearch(root) {
        console.log(root);
    }
}

export default IDAStarSearch;