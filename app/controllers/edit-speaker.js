import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),

    actions: {
        async editSpeaker(idSpeaker) {
            await this.get("dataService").editSpeaker({
                id: parseInt(idSpeaker),
                name: this.get('speakerName'),
                surname: this.get('speakerSurname'),
                patronymic: this.get('speakerPatronymic'),
            })
            this.set('speakerName'); this.set('speakerSurname'); this.set('speakerPatronymic');
            this.transitionToRoute('speakers');
        }
    }
});