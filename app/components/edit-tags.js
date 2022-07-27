import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Component.extend({
    dataService: service('data'),

    init() {
        // console.log(book.id);
        this._super(...arguments);
        // let temp = [], tagsForThisBook = [];
        // temp = this.get("dataService").getTags();
        // temp.then( (result) => {
        //     for(var i=0;i<book.tags.length;i++){
        //         for(var j=0;j<result.length;j++){
        //             if(book.tags[i]==result[j].id){ 
        //                 console.log(result[j].tagname.toString());
        //                 tagsForThisBook[i]=result[j].tagname.toString();
        //             } 
        //         }
        //     }
        //     this.set('tagsForThisBook', A(tagsForThisBook));
        // })
        // .catch( (err) => {
        //     console.log(err);
        // })
    },
});
