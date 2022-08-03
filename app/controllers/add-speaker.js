import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),

    actions: {
        async addSpeaker() {
            await this.get("dataService").createSpeaker({
                name: this.get('speakerName'),
                surname: this.get('speakerSurname'),
                patronymic: this.get('speakerPatronymic'),
            });
            this.transitionToRoute('speakers');
        }
    }
});
