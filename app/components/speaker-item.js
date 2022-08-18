import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    store: service('store'),

    init() {
        this._super(...arguments);
    },

    actions: {
        async deleteSpeaker(speaker) {
            await speaker.destroyRecord();
            this.get('store').unloadRecord(speaker);
        }
    }
});
