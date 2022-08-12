import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    dataService: service('data'),

    actions: {
        async deleteSpeaker(speaker) {
            await speaker.destroyRecord();
            // this.transitionToRoute('speaker');
        }
    }
});
