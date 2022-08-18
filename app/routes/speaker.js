import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    queryParams: {
        search: {
            refreshModel: false,
        },
    },
    
    model({ search }){
        // return this.get("dataService").getSpeakers(search);
        if(search) return this.get('store').query('speaker', { q: search});
        else return this.get('store').findAll("speaker");
    },
    
    actions: {
        reloadModel() {
            this.refresh();
        }
    }
});