import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    dataService: service('data'),

    model({ id }) {
        console.log(window.location.href );
        return this.get("dataService").get_book(id);
    }
});
