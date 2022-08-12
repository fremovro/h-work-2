import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),

    actions: {
        async editSpeaker() {
            let speakerModel = this.get('model');
            if(this.get('speakerName')) speakerModel.set('name', this.get('speakerName'));
            if(this.get('speakerSurname')) speakerModel.set('surname', this.get('speakerSurname'));
            if(this.get('speakerPatronymic')) speakerModel.set('patronymic', this.get('speakerPatronymic'));
            
            await speakerModel.save();

            this.set('speakerName'); this.set('speakerSurname'); this.set('speakerPatronymic');
            this.transitionToRoute('speaker');
        }
    }
});