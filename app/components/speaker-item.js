import Component from '@ember/component';

export default Component.extend({
    init() {
        this._super(...arguments);
    },

    actions: {
        async deleteSpeaker(speaker) {
            this.delSpeaker(speaker);
        }
    }
});
