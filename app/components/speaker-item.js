import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    dataService: service('data'),

    actions: {
        async deleteSpeaker(speaker) {
            await this.get('dataService').deleteSpeaker(speaker);
            this.transitionToRoute('books');
        }
    }
});
