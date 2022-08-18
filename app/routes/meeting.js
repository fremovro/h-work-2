import Route from '@ember/routing/route';

export default Route.extend({

    model() {
        return this.get('store').findAll("meeting");
    },
    setupController(controller, model) {
        this._super(...arguments);
        // if (this.get('modelPromise')) {
        //   controller.set('isLoading', true);
        // }
    },
});
