import Controller from '@ember/controller';
import ENV from 'h-work-2/config/environment';
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

        async editBook() {
            let bookModel = this.get('model');

            const uploadData = get(this, 'uploadData');
            if(uploadData) {
                uploadData.url = `${ENV.backendURL}/FileUpload`;
                uploadData.submit().done(async (result) => {
                    await bookModel.set('coverURL', `/uploads/${result.filename}`);
                });
                await bookModel.save();
            }

            if(this.get('bookName')) bookModel.set('name', this.get('bookName'));
            if(this.get('bookAuthor')) bookModel.set('author', this.get('bookAuthor'));
            if(this.get('bookSize')) bookModel.set('size', this.get('bookSize'));
            if(this.get('bookDescription')) bookModel.set('description', this.get('bookDescription'));
            if(this.get('tags')) bookModel.set('tags', this.get('tags'));

            await bookModel.save();

            this.set('bookName'); this.set('bookAuthor'); this.set('bookSize'); this.set('bookDescription');
            this.transitionToRoute('book');
        },
    },

    reset() {
        set(this, 'uploadData', null);
    }
});
