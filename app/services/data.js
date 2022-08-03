import Service from '@ember/service';
import ENV from 'h-work-2/config/environment';
import { A } from '@ember/array';

export default Service.extend({
    init() {
        this._super(...arguments);
        this.set('books', A());
        this.set('speakers', A());
        this.set('tags', A());
    },

    async getBooks(search, tagsSearch) {
        var query = '';
        if(search || tagsSearch){
            if(search && tagsSearch){
                query = `?q=${search}&tags_like=${tagsSearch}`;
            }
            else{
                if(search) query = `?q=${search}`;
                else query = `?tags_like=${tagsSearch}`;
            }
        }
        else query = '';
        let response = await fetch(`${ENV.backendURL}/db_books${query}`);
        let books = await response.json();
        this.get('books').clear();
        this.get('books').pushObjects(books);
        return this.get('books');
    },

    async getSpeakers(search) {
        var query = '';
        if(search) query = `?q=${search}`;
        let response = await fetch(`${ENV.backendURL}/db_speakers${query}`);
        let speakers = await response.json();
        this.get('speakers').clear();
        this.get('speakers').pushObjects(speakers);
        return this.get('speakers');
    },
    
    async getTags() {
        let response = await fetch(`${ENV.backendURL}/db_tags`);
        let tags = await response.json();
        this.get('tags').clear();
        this.get('tags').pushObjects(tags);
        return this.get('tags');
    },

    getTagById(id) {
        return this.get('tags').find((tag) => tag.id === parseInt(id));
    },

    getBook(id) {
        return this.get('books').find((book) => book.id === parseInt(id));
    },

    getSpeaker(id) {
        return this.get('speakers').find((speaker) => speaker.id === parseInt(id));
    },
    
    deleteBook(book) {
        this.get('books').removeObject(book);
        return fetch(`${ENV.backendURL}/db_books/${book.id}`, { method: 'DELETE'});
    },

    deleteSpeaker(speaker) {
        this.get('speakers').removeObject(speaker);
        return fetch(`${ENV.backendURL}/db_speakers/${speaker.id}`, { method: 'DELETE'});
    },

    createBook(book) {
        this.get('books').pushObject(book);
        return fetch(`${ENV.backendURL}/db_books`, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
            'Content-Type': 'application/json'
            }
        });
    },

    createSpeaker(speaker) {
        this.get('speakers').pushObject(speaker);
        return fetch(`${ENV.backendURL}/db_speakers`, {
            method: 'POST',
            body: JSON.stringify(speaker),
            headers: {
            'Content-Type': 'application/json'
            }
        });
    },

    async editBook(book, uploadData) {
        this.get('books').removeObject(this.get('books').find((temp) => temp.id === parseInt(book.id)));
        this.get('books').pushObject(book);
        if(uploadData) {
            uploadData.url = `${ENV.backendURL}/FileUpload`;
            uploadData.submit().done(async (result/*, textStatus, jqXhr*/) => {
                const dataToUpload = {
                    entityName: 'db_books',
                    id: book.id,
                    fileName: result.filename
                };
                
                await fetch(`${ENV.backendURL}/saveURL`, {
                    method: 'POST',
                    body: JSON.stringify(dataToUpload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            });
        }
        
        return await fetch(`${ENV.backendURL}/db_books/${book.id}`, {
            method: 'PATCH',
            body: JSON.stringify(book),
            headers: {
            'Content-Type': 'application/json'
            }
        });
    },

    editSpeaker(speaker) {
        this.get('speakers').removeObject(this.get('speakers').find((temp) => temp.id === parseInt(speaker.id)));
        this.get('speakers').pushObject(speaker);
        return fetch(`${ENV.backendURL}/db_speakers/${speaker.id}`, {
            method: 'PATCH',
            body: JSON.stringify(speaker),
            headers: {
            'Content-Type': 'application/json'
            }
        });
    },
});
