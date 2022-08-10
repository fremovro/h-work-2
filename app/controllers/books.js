import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),
    queryParams: ["search", "tags"],
    search: '',
    tags: '',
    init() {
        this._super(...arguments);
    },
    actions: {
        updatePage() {
            this.send("reloadModel");
        },
    }
});
