import Controller from '@ember/controller';
import { computed } from '@ember/object';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';

export default Controller.extend({
    store: service('store'),

    queryParams: ['page', 'chosenBook', 'chosenSpeaker'],
    page: 1,
    chosenBook: '',
    chosenSpeaker: '',

    pages: computed('model.meta.total', function() {
        const total = Number(this.get('model.meta.total'));
        if (Number.isNaN(total) || total <= 0) {
          return [];
        }
    
        return new Array(Math.ceil(total / 2))
          .fill()
          .map((value, index) => index + 1);
    }),

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
        getBooks() {
            return this.get('store').findAll('book');
        },
        getSpeakers() {
            return this.get('store').findAll('speaker');
        }
    }
});
