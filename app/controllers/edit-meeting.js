import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    store: service('store'),

    init() {
        this._super(...arguments);
    },

    actions: {
        async editMeeting() {
            let meetingModel = this.get('model');
            if(this.get('meetingEventDate')) {
                meetingModel.set('eventDate', this.get('meetingEventDate'));
                meetingModel.lectures.forEach(lecture => {
                    lecture.set('date', this.get('meetingEventDate'));
                    lecture.save();
                });
            }
            await meetingModel.save();

            this.set('meetingEventDate', undefined);
            this.transitionToRoute('meeting');
        },
        async deleteLecture(lecture) {
            await lecture.destroyRecord();
            this.get('store').unloadRecord(lecture);
        }
    }
});
