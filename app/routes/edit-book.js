import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
    dataService: service('data'),

    model({ id }) {
        // console.log(window.location.href );
        // console.log(this.router.currentURL); // returns null
        // console.log(this.router.get('currentURL')); // returns null
        return this.get("dataService").get_book(id);
    }
});
