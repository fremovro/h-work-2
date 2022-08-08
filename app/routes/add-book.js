import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
    setupController(controller) {
        this._super(...arguments);
        set(controller, 'uploadData', null);
    },
});
