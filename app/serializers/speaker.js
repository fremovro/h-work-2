// import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    normalize(model, hash) {
        hash = this._super(...arguments);
        // let hashCopy = Object.assign({}, hash);
        // hashCopy.attributes = {};
        // hashCopy.attributes.name = hashCopy.name;
        // hashCopy.attributes.surname = hashCopy.surname;
        // hashCopy.attributes.patronymic = hashCopy.patronymic;
        // delete hashCopy.name;
        // delete hashCopy.surname;
        // delete hashCopy.patronymic;
        // hash = {
        //     data: hashCopy
        // };

        return hash;
    },

    // serialize(snapshot, options) {
    //     let json = this._super(...arguments);
    //     json.type = snapshot.modelName;
    //     return json;
    // }
});
