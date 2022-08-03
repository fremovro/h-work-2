import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    dataService: service('data'),

    init() {
        this._super(...arguments);
        // this.set('tags', A()); 
    },

    actions: {

        async deleteBook(book) {
            await this.get('dataService').deleteBook(book);
        },
    }
});
