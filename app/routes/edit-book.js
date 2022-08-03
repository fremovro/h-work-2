import Route from '@ember/routing/route';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
    dataService: service('data'),
    setupController(controller) {
        this._super(...arguments);
        set(controller, 'uploadData', null);
    },
    model({ id }) {
        return this.get("dataService").getBook(id);
    }
});
