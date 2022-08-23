import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    store: service('store'),

    init() {
        this._super(...arguments);
    },

    actions: {
        async addMeeting() {
            let meetingModel = this.get('model');
            if(this.get('meetingEventDate')) {
                meetingModel.set('eventDate', this.get('meetingEventDate'));
                console.log(meetingModel);
                meetingModel.lectures.forEach(lecture => {
                    lecture.set('date', this.get('meetingEventDate'));
                    lecture.save();
                });
                await meetingModel.save();
                this.set('meetingEventDate');
                this.transitionToRoute('meeting');
            }
            else alert('необходимо указать дату встречи...')
        },
        async deleteMeeting(meeting) {
            let temp = meeting;
            await meeting.destroyRecord();
            temp.lectures.forEach(lecture => {
                lecture.destroyRecord();
                this.get('store').unloadRecord(lecture);
            });
            this.get('store').unloadRecord(meeting);
            this.transitionToRoute('meeting');
        },
        async deleteLecture(lecture) {
            await lecture.destroyRecord();
            this.get('store').unloadRecord(lecture);
        }
    }
});
