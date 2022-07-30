import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),
    queryParams: ["search"],
    search: '',
    actions: {
        setTagSearch(tagSearch) {
            return this.get("dataService").setTagSearch(tagSearch);
        }
    }
});
