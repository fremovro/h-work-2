import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
    store: service('store'),
    queryParams: ["search", "tags"],
    search: '',
    tags: '',

    actions: {
        updatePage() {
            this.send("reloadModel");
        },
        async deleteBook(book) {
            await book.destroyRecord();
            this.get('store').unloadRecord(book);
        },
    }
});
