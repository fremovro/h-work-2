import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),

    actions: {
        editBook(idBook) {
            let tagsInput=document.getElementById('tagsInput');
            let tags = [];
            for(var i=0;i<tagsInput.childElementCount-1;i++){
                tags[i] = tagsInput.children[i].id;
            }
            this.get("dataService").editBook({
                id: parseInt(idBook),
                name: this.get('bookName'),
                author: this.get('bookAuthor'),
                size: this.get('bookSize'),
                description: this.get('bookDescription'),
                tags: tags,
            })
        },
    }
});
