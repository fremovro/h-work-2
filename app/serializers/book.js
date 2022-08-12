import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
    normalize(model, hash) {
        hash = this._super(...arguments);
        return hash;
    },
});
// export default DS.JSONSerializer.extend({
//     normalize(model, hash) {
//         let hashCopy = Object.assign({}, hash);
//         hashCopy.attributes = {};
//         hashCopy.attributes.name = hashCopy.name;
//         hashCopy.attributes.author = hashCopy.author;
//         hashCopy.attributes.size = hashCopy.size;
//         hashCopy.attributes.description = hashCopy.description;
//         hashCopy.attributes.tags = hashCopy.tags;
//         hashCopy.attributes.coverURL = hashCopy.coverURL;
//         delete hashCopy.name;
//         delete hashCopy.author;
//         delete hashCopy.size;
//         delete hashCopy.description;
//         delete hashCopy.tags;
//         delete hashCopy.coverURL;
//         hash = {
//             data: hashCopy
//         };

//         return hash;
//     }
// });
