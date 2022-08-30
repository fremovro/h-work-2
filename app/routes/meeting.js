import Route from '@ember/routing/route';

export default Route.extend({
    queryParams: {
        page: {
          refreshModel: true
        },
        chosenSpeaker: {
            refreshModel: true
        },
        chosenBook: {
            refreshModel: true
        },
    },

    model({ page, chosenSpeaker, chosenBook }) {
        const query = {
            _page: page,
            _limit: 2,
        };
        if(chosenSpeaker) { 
            console.log(chosenSpeaker);
            query.chosenSpeaker = chosenSpeaker;
        }
        if(chosenBook) query.chosenBook = chosenBook;
        
        return this.get('store').query('meeting', query);
    },

    setupController(controller, model) {
        this._super(...arguments);
    },
});
