import Service from '@ember/service';
import ENV from 'h-work-2/config/environment';
import { A } from '@ember/array';

export default Service.extend({
    init() {
        this._super(...arguments);
        this.set('books', A());
        // this.set('speakers', A());
    },

    async get_books() {
        // return fetch(`${ENV.backendURL}/db_books`).then((response) => response.json());
        let response = await fetch(`${ENV.backendURL}/db_books`);
        let books = await response.json();
        this.get('books').clear();
        this.get('books').pushObjects(books);
        return this.get('books');
    },

    // async get_speakers() {
    //     // return fetch(`${ENV.backendURL}/db_books`).then((response) => response.json());
    //     let response = await fetch(`${ENV.backendURL}/db_speakers`);
    //     let speakers = await response.json();
    //     this.get('speakers').clear();
    //     this.get('speakers').pushObjects(speakers);
    //     return this.get('speakers');
    // },

    get_book(id) {
        // return fetch(`${ENV.backendURL}/db_books/${id}`).then((response) => response.json());
        return this.get('books').find((book) => book.id === parseInt(id));
    },
    
    deleteBook(book) {
        this.get('books').removeObject(book);
        return fetch(`${ENV.backendURL}/db_books/${book.id}`, { method: 'DELETE'});
    },

    // deleteSpeaker(speaker) {
    //     this.get('speakers').removeObject(speaker);
    //     return fetch(`${ENV.backendURL}/db_speakers/${speaker.id}`, { method: 'DELETE'});
    // },

    createBook(book) {
        return fetch(`${ENV.backendURL}/db_books`, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
            'Content-Type': 'application/json'
            }
        });
    },

    editBook(book) {
        return fetch(`${ENV.backendURL}/db_books/${book.id}`, {
            method: 'PATCH',
            body: JSON.stringify(book),
            headers: {
            'Content-Type': 'application/json'
            }
        });
    }
});
