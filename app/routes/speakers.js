import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    queryParams: {
        search: {
            refreshModel: false,
        },
    },
    
    dataService: service('data'),
    
    model({ search }){
        return this.get("dataService").getSpeakers(search);
    },
    
    actions: {
        reloadModel() {
            this.refresh();
        }
    }
});
