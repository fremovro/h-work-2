import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    dataService: service('data'),

    actions: {
        async deleteBook(book) {
            await this.get('dataService').deleteBook(book);
            // this.transitionToRoute('books');
        }
    }
});
