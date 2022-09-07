import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
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