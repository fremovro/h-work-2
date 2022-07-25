import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    dataService: service('data'),

    actions: {
        editBook(idBook) {
            console.log(parseInt(idBook)+' '+this.get('bookName'));
            this.get("dataService").editBook({
                id: parseInt(idBook),
                name: this.get('bookName'),
                author: this.get('bookAuthor'),
                size: this.get('bookSize'),
                description: this.get('bookDescription'),
            })
            this.transitionToRoute('books');
        }
    }
});
