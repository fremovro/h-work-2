import Controller from '@ember/controller';
import lecture from '../models/lecture';

export default Controller.extend({
    actions: {
        async editLecture() {
            let lectureModel = this.get('model');
            let id = lectureModel.meeting.get('id');
            
            let meeting = this.get('store').findRecord('meeting', id);
            // lectureModel.set('meeting', this.get('store').findRecord('meeting', id));
            // await this.get('model').save();
            console.log(meeting);

            this.set('lectureRating');
            this.transitionToRoute('edit-meeting', id);
        }
    }
});
