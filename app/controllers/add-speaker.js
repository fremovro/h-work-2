import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),

    actions: {
        async addSpeaker() {
            let speakerModel = {
                name: this.get('speakerName'),
                surname: this.get('speakerSurname'),
                patronymic: this.get('speakerPatronymic'),
            };
            let newSpeaker = this.get('store').createRecord('speaker', speakerModel);
            newSpeaker.serialize();
            await newSpeaker.save();
            this.transitionToRoute('speaker');
        }
    }
});
