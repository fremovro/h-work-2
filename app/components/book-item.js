import Component from '@ember/component';
import { inject as service } from '@ember/service';


export default Component.extend({
    // store: service('store'),

    // init() {
    //     this._super(...arguments);
    // },

    actions: {
        async deleteBook(book) {
            console.log('1');
            this.send("delBook", book);
            // await book.destroyRecord();
            // this.get('store').unloadRecord(book);
        },
    }
});
