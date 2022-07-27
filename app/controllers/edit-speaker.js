import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),

    actions: {
        editSpeaker(idSpeaker) {
            this.get("dataService").editSpeaker({
                id: parseInt(idSpeaker),
                name: this.get('speakerName'),
                surname: this.get('speakerSurname'),
            })
            // this.transitionToRoute('books');
        }
    }
});