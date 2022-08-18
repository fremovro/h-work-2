import Controller from '@ember/controller';
import lecture from '../models/lecture';
import { inject as service } from '@ember/service';

export default Controller.extend({
    store: service(),
    actions: {
        async editLecture() {
            let lectureModel = this.get('model');
            if(this.get('lectureRating')) lectureModel.set('rating', this.get('lectureRating'));
            // lectureModel.set('meeting', this.get('store').findRecord('meeting', id));
            await lectureModel.save();
            // console.log(meeting);

            this.set('lectureRating');
            this.transitionToRoute('edit-meeting', lectureModel.meeting.get('id'));
        },
        getBooks() {
            return this.get('store').findAll('book');
        }
    }
});
