import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({
    dataService: service('data'),

    actions: {
        changeUploadData(uploadData) {
            set(this, 'uploadData', uploadData);
        },
        async editBook(idBook) {
            let tagsInput=document.getElementById('tagsInput');
            let tags = [];
            for(var i=0;i<tagsInput.childElementCount-1;i++){
                tags[i] = tagsInput.children[i].id;
            }
            const uploadData = get(this, 'uploadData');
            await this.get("dataService").editBook({
                id: parseInt(idBook),
                name: this.get('bookName'),
                author: this.get('bookAuthor'),
                size: this.get('bookSize'),
                description: this.get('bookDescription'),
                tags: tags,
            }, uploadData);
            this.set('bookName'); this.set('bookAuthor'); this.set('bookSize'); this.set('bookDescription');
            this.transitionToRoute('books');
        },
    },

    reset() {
        set(this, 'uploadData', null);
      }
});
