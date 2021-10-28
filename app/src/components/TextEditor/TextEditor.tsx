import { observer } from "mobx-react";
import React from "react";
import Editor from "rich-markdown-editor";
import useStores from "../../hooks/useStores";
import { debounce } from 'lodash';

import './TextEditor.css'

export const TextEditor = () => {
  const { documentStore } = useStores();
    
  const updateBody = debounce((body: any) => {
    documentStore?.updateActiveDocumentBody(body);
  }, 1000)

  return (
    <div className="text-editor">
      {
        documentStore?.activeDocument 
                && (
                  <>
                    <Editor
                      onChange={getValue => updateBody(getValue())}
                      value={documentStore?.activeDocument?.body ? documentStore?.activeDocument?.body : " "}
                    />
                    <h6>Updated at: {new Date(documentStore?.activeDocument?.updated_at as string).toLocaleString()}</h6>
                  </>
                )
      }
    </div>
  )
}

export default observer(TextEditor)