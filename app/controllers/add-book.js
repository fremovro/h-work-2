import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';

export default Controller.extend({
    dataService: service('data'),

    actions: {
        changeUploadData(uploadData) {
            set(this, 'uploadData', uploadData);
        },
        changeTags(newTags) {
            set(this, 'tags', [...newTags]);
        },
        async addBook() {
            let newBook = await this.get("dataService").createBook({
                name: this.get('bookName'),
                author: this.get('bookAuthor'),
                size: this.get('bookSize'),
                description: this.get('bookDescription'),
                coverURL: "images/book-cover.jpg",
                tags: this.get('tags'),
            });
            const uploadData = get(this, 'uploadData');
            await this.get("dataService").editBook({
                id: parseInt(newBook.id),
            }, uploadData);
            this.set('bookName'); this.set('bookAuthor'); this.set('bookSize'); this.set('bookDescription');
            this.transitionToRoute('books');
        }   
    },

    reset() {
        set(this, 'uploadData', null);
      }
});
