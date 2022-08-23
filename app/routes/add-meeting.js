import Route from '@ember/routing/route';

export default Route.extend({
    meetingEventDate: "Укажите дату",

    model({ id }) {
        console.log(id);
        if(id == 0) { 
            let newMeeting = this.get('store').createRecord('meeting');
            return newMeeting.save();
        }
        else {
            return this.get('store').findRecord('meeting', id);
        }
    }
});
