import Controller from '@ember/controller';
import RSVP from 'rsvp';
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
                this.set('meetingEventDate', undefined);
                this.transitionToRoute('meeting');
            }
            else alert('необходимо указать дату встречи...')
        },
        async deleteMeeting(meeting) {
            let temp = meeting; let temp2 =[], temp3=[];

            temp.get('lectures').toArray().forEach(lecture => {
                temp2.push(lecture);
                const promise = lecture.destroyRecord();
                temp3.push(promise);
            });
            await RSVP.all(temp3);
            temp2.forEach(lecture => {
                this.get('store').unloadRecord(lecture);
            })
            await meeting.destroyRecord();
            this.get('store').unloadRecord(meeting);
            this.transitionToRoute('meeting');
        },
        async deleteLecture(lecture) {
            await lecture.destroyRecord();
            this.get('store').unloadRecord(lecture);
        }
    }
});
