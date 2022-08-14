import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

export default Route.extend({
    store: service('store'),

    queryParams: {
        search: {
            refreshModel: false,
        },
        tags: {
            refreshModel: false,
        }
    },

    init() {
        this._super(...arguments);
    },

    model({ search, tags }) {
        if(search || tags){
            return this.get('store').query('book', { q: search, tags_like: tags });
        }
        else {
            // return new Promise((resolve) => {
            //     later(async () => {
            //         let books = await this.get("dataService").getBooks(search, tags);
            //         resolve(books);
            //     }, 1500);
            // });
            return this.get('store').findAll("book");
        }
    },
    actions: {
        reloadModel() {
            this.refresh();
        },
        async delBook(book) {
            console.log('2');
            await book.destroyRecord();
            this.get('store').unloadRecord(book);
        }
    }
});
