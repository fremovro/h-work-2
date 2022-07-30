import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    dataService: service('data'),

    model({ book }) {
        return this.get("dataService").get_speaker(book.id);
    }
});
