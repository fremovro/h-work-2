import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    store: service(),
    actions: {
        async addLecture() {
            let meetingModel = this.get('model').meeting;
            if(this.get('newBook') && this.get('newSpeaker'))
            {
                let lectureModel = {
                    date: meetingModel.get('eventDate'),
                    rating: this.get('lectureRating'),
                    presentURL: this.get('newPresentURL'),
                    videoURL: this.get('newVideoURL'),
                    review: this.get('newReview'),
                    book: this.get('newBook'),
                    speaker: this.get('newSpeaker'),
                    meeting: meetingModel
                };
                let newLecture = this.get('store').createRecord('lecture', lectureModel);
                await newLecture.save();
                await meetingModel.get('lectures').reload();
                this.setProperties({
                    lectureRating: undefined,
                    newBook: undefined,
                    newSpeaker: undefined,
                    newPresentURL: undefined,
                    newVideoURL: undefined,
                    newReview: undefined
                });
                this.transitionToRoute('add-meeting', meetingModel.get('id'));
            }
            else {
                alert('для создания нового доклада необходимо выбрать книгу и спикера...');
            }
        }
    }
});
