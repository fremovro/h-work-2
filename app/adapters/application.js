import DS from 'ember-data';
import { isNone } from '@ember/utils';
import ENV from 'h-work-2/config/environment';

export default DS.JSONAPIAdapter.extend({
    host: ENV.backendURL,
    
    init() {
        this._super(...arguments);
        this.set('headers', {
            'Content-Type': 'application/json'
        });
    },

    buildURL(modelName, id, snapshot, requestType, query) {
        let url = this._super(...arguments);
        if (modelName === 'meeting' && requestType === 'findAll') {
            url += '?_embed=lectures';
        }

        // if (modelName === 'book' && requestType === 'findRecord' && id) {
        //     url += '?_embed=reviews';
        // }

        return url;
    },
});
