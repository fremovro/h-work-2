import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    store: service('store'),
    queryParams: ["search"],
    search: '',
    actions: {
        updatePage() {
            this.send("reloadModel");
        },
        async deleteSpeaker(speaker) {
            await speaker.destroyRecord();
            this.get('store').unloadRecord(speaker);
        }
    }
});
