import { makeAutoObservable } from "mobx";

export default class UIStore {
  activeDocumentId: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setActiveDocumentId(activeDocumentId: string) {
    this.activeDocumentId = activeDocumentId;
  }
}
