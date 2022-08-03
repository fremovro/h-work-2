import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';

export default Route.extend({
    queryParams: {
        search: {
            refreshModel: true,
        },
        tags: {
            refreshModel: true,
        }
    },

    dataService: service('data'),

    model({ search, tags }) {
        if(search || tags){
            return this.get("dataService").getBooks(search, tags);
        }
        else {
            return new Promise((resolve) => {
                later(async () => {
                    let books = await this.get("dataService").getBooks(search, tags);
                    resolve(books);
                }, 0);
            });
        }
    },
    actions: {
        loading(transition, originRoute) {
            return false;
        }
    }
});
