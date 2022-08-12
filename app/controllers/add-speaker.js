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
            // speakerModel.set('name', this.get('speakerName'));
            // speakerModel.set('surname', this.get('speakerSurname'));
            // speakerModel.set('patronymic', this.get('speakerPatronymic'));
            let newSpeaker = this.get('store').createRecord('speaker', speakerModel);
            newSpeaker.serialize();
            await newSpeaker.save();
            // await this.get("dataService").createSpeaker({
            //     name: this.get('speakerName'),
            //     surname: this.get('speakerSurname'),
            //     patronymic: this.get('speakerPatronymic'),
            // });
            this.transitionToRoute('speaker');
        }
    }
});
