import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),

    actions: {
        async addBook() {
            await this.get("dataService").createBook({
                name: this.get('bookName'),
                author: this.get('bookAuthor'),
                size: this.get('bookSize'),
                description: this.get('bookDescription'),
                coverURL: "images/book-cover.jpg",
            })
            this.transitionToRoute('books');
        }
    }
});
