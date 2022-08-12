import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

export default Route.extend({
    queryParams: {
        search: {
            refreshModel: false,
        },
        tags: {
            refreshModel: false,
        }
    },

    dataService: service('data'),

    model({ search, tags }) {
        if(search || tags){
            // return this.get("dataService").getBooks(tsearch, tags);
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
        }
    }
});
