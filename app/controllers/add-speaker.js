import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    currentUser: service(),
    
    actions: {
        async addSpeaker() {
            let speakerModel = {
                name: this.get('speakerName'),
                surname: this.get('speakerSurname'),
                patronymic: this.get('speakerPatronymic'),
                user: this.get('currentUser.user')
            };
            let newSpeaker = this.get('store').createRecord('speaker', speakerModel);
            newSpeaker.serialize();
            await newSpeaker.save();
            this.transitionToRoute('speaker');
        }
    }
});
