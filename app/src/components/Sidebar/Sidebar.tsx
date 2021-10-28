import { observer } from "mobx-react";
import React, { useRef, useState } from "react";
import useStores from "../../hooks/useStores";
import AddingDocumentItem from "./AddingDocumentItem";
import DocumentItem from "./DocumentItem";
import "./Sidebar.css";

export const Sidebar = () => {
  const sidebarRef = useRef(null);
    
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(268);
  const { documentStore, ui } = useStores();

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX - (sidebarRef?.current as any)?.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );
    
  const deleteDocumentItem = (id: string) => {
    documentStore?.deleteDocument(id)
  }

  const saveDocumentItem = (title: string) => {
    documentStore?.addDocument(title)
  }

  const setAsActive = (documentId: string) => {
    ui?.setActiveDocumentId(documentId);
    console.log(documentId)
  }

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      ref={sidebarRef}
      className="sidebar"
      style={{ width: sidebarWidth }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="sidebar-content"> 
        <menu className="document-container">
          <h2 className="document-container-title">Documents ({documentStore?.documents.length})</h2>
          {
            documentStore.documents.map((document: any) => ( 
              <DocumentItem
                active={ui?.activeDocumentId === document.id}
                onSetAsActive={() => setAsActive(document.id)}
                key={document.id}
                title={document.title}
                onDelete={() => deleteDocumentItem(document.id)}
              />
            ))
          }
          <AddingDocumentItem onSaveDocumentItem={(title: string) => saveDocumentItem(title)} />
        </menu>
      </div>
      <div className="sidebar-resizer" onMouseDown={startResizing} />
    </div>
  )
}

export default observer(Sidebar);
