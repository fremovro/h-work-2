import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
    dataService: service('data'),
    store: service('store'),

    init() {
        this._super(...arguments);

        // this.set('tags', A()); 
    },

    actions: {
        async deleteBook(book) {
            await book.destroyRecord();
            this.get('store').unloadRecord(book);
        },
    }
});
