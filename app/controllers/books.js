import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),
    queryParams: ["search", "tags"],
    search: '',
    tags: '',
    actions: {
        updatePage() {
            location.reload();
        }
    }
});
