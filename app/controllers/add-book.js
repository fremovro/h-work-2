import Controller from '@ember/controller';
import ENV from 'h-work-2/config/environment';
import { get, set } from '@ember/object';

export default Controller.extend({
    actions: {
        changeUploadData(uploadData) {
            set(this, 'uploadData', uploadData);
        },

        changeTags(newTags) {
            set(this, 'tags', [...newTags]);
        },

        async addBook() {
            const uploadData = get(this, 'uploadData');
            let coverURL = new Promise((resolve, reject) => {
                if(uploadData) {
                    uploadData.url = `${ENV.backendURL}/FileUpload`;
                    uploadData.submit().done((result) => {
                        resolve(`/uploads/${result.filename}`);
                    });
                }
                else resolve("images/book-cover.jpg");
            });
            let tags = this.get('tags') ? this.get('tags') : [];
            let bookModel = {
                name: this.get('bookName'),
                author: this.get('bookAuthor'),
                size: this.get('bookSize'),
                description: this.get('bookDescription'),
                coverURL: await coverURL,
                tags: this.get('tags'),
            };
            
            let newBook = this.get('store').createRecord('book', bookModel);
            newBook.serialize();
            await newBook.save();
            this.setProperties({
                bookName: undefined,
                bookAuthor: undefined,
                bookSize: undefined,
                bookDescription: undefined
            });
            this.set('bookName'); this.set('bookAuthor'); this.set('bookSize'); this.set('bookDescription');
            this.transitionToRoute('book');
        }   
    },

    reset() {
        set(this, 'uploadData', null);
    }
});
