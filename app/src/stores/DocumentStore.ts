import { action, makeAutoObservable, makeObservable, observable, runInAction } from 'mobx'

const apiUrl = `http://localhost:3001/v1/documents`;

export interface Document {
    id?: string;
    body?: string;
    created_at?: string;
    deleted_at?: string;
    ordinal_number?: number;
    parent_id?: string;
    title?: string;
    updated_at?: string;
}

export default class DocumentStore {
    documents: Document[] = []

    constructor() {
        makeAutoObservable(this)
        this.fetchDocuments()
    }

    addDocument(title: string) {
        const document: Document = {
            title
        } 
        fetch(`${apiUrl}`, {
                method: 'POST',
                body: JSON.stringify(document)
            })
            .then(r => r.json());
        this.documents.push(document);
    }

    deleteDocument(documentId: string) {
        runInAction(() => {
            fetch(`${apiUrl}/${documentId}`, { method: 'DELETE' })
                .then(r => r.json())
                .then(json => this.documents = this.documents.filter(document => document.id !== documentId));
        });
    }

    fetchDocuments() {
        fetch(apiUrl)
            .then(r => r.json())
            .then(json => this.documents = json.data);
    }
}
