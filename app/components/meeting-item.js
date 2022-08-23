import Component from '@ember/component';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Component.extend({
    store: service('store'),

    init() {
        this._super(...arguments);
    },

    actions: {
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
        },
    }
});
