import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    queryParams: {
        search: {
            refreshModel: true
        }
    },

    dataService: service('data'),

    model({ search }){
        return search ? this.get("dataService").get_books(search) : this.get("dataService").get_books();
    }
});
