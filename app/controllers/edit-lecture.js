import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    store: service(),
    actions: {
        async editLecture() {
            let lectureModel = this.get('model');
            if(this.get('lectureRating')) lectureModel.set('rating', this.get('lectureRating'));
            if(this.get('newBook')) lectureModel.set('book', this.get('newBook'));
            if(this.get('newSpeaker')) lectureModel.set('speaker', this.get('newSpeaker'));
            if(this.get('newPresentURL')) lectureModel.set('presentURL', this.get('newPresentURL'));
            if(this.get('newVideoURL')) lectureModel.set('videoURL', this.get('newVideoURL'));
            if(this.get('newReview')) lectureModel.set('review', this.get('newReview'));

            await lectureModel.save();

            this.setProperties({
                lectureRating: undefined,
                newBook: undefined,
                newSpeaker: undefined,
                newPresentURL: undefined,
                newVideoURL: undefined,
                newReview: undefined
            });
            this.transitionToRoute('edit-meeting', lectureModel.meeting.get('id'));
        },
        getBooks() {
            return this.get('store').findAll('book');
        },
        getSpeakers() {
            return this.get('store').findAll('speaker');
        }
    }
});
