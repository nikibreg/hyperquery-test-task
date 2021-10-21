import UIStore from "./UIStore";
import DocumentStore from "./DocumentStore";

export interface IRootStore {
  ui?: UIStore;
  documentStore?: DocumentStore;
}

export default class RootStore implements IRootStore {
  ui: UIStore;
  documentStore: DocumentStore;

  constructor() {
    this.ui = new UIStore();
    this.documentStore = new DocumentStore(this.ui);
  }

  get stores() {
    return {
      ui: this.ui,
      document: this.ui
    };
  }
}
