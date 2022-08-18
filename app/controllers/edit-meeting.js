import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async editMeeting() {
            let meetingModel = this.get('model');
            if(this.get('meetingEventDate')) {
                meetingModel.set('eventDate', this.get('meetingEventDate'));    
            }
            await meetingModel.save();

            this.set('meetingEventDate');
            this.transitionToRoute('meeting');
        }
    }
});
