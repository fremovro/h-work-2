import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    queryParams: ["search", "tags"],
    search: '',
    tags: '',

    actions: {
        updatePage() {
            this.send("reloadModel");
        }
    }
});
