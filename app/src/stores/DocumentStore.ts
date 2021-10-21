import { action, makeAutoObservable, makeObservable, observable, runInAction } from 'mobx'
import UIStore from './UIStore';

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

    constructor(private uiStore: UIStore) {
        makeAutoObservable(this)
        this.fetchDocuments()
    }

    
    public get activeDocument(): Document | undefined {
        return this.documents?.find(document => document.id === this.uiStore.activeDocumentId)
    }
    
    addDocument(title: string) {
        const document: Document = {
            title
        } 
        fetch(`${apiUrl}`, {
                method: 'POST',
                body: JSON.stringify(document)
            })
            .then(r => r.json())
            .then(json => {
                const newDocument = json.data;
                this.documents[this.documents.length - 1] = newDocument
                
                this.uiStore.setActiveDocumentId(newDocument.id as string)
            });
        this.documents.push(document);
    }

    deleteDocument(documentId: string) {
        runInAction(() => {
            fetch(`${apiUrl}/${documentId}`, { method: 'DELETE' })
                .then(r => r.json())
                .then(json => this.documents = this.documents.filter(document => document.id !== documentId));
        });
    }

    updateActiveDocumentBody(body: string) {
        const document = {
            ...this.activeDocument,
            body,
        };
        delete document.created_at
        delete document.deleted_at
        delete document.updated_at
        fetch(`${apiUrl}/${document.id}`, {
            method: 'PATCH',
            body: JSON.stringify(document)
        })
        .then(r => r.json())
        .then(json => {
            this.documents[this.documents.findIndex(d => d.id === document.id)] = json.data;
        });
    }

    fetchDocuments() {
        fetch(apiUrl)
            .then(r => r.json())
            .then(json => {
                this.documents = json.data.sort((doc1: Document, doc2: Document) => (doc1?.ordinal_number as number) - (doc2?.ordinal_number as number));
                if (this.documents?.length) {
                    this.uiStore.setActiveDocumentId(this.documents[0]?.id as string)
                }
            });
    }
}
