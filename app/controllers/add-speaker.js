import Controller from '@ember/controller';

export default Controller.extend({
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
