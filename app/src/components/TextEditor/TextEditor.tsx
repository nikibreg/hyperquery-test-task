import { observer } from "mobx-react";
import React from "react";
import Editor from "rich-markdown-editor";
import useStores from "../../hooks/useStores";
import { Document } from "../../stores/DocumentStore";

import './TextEditor.css'

export const TextEditor = () => {
    const { documentStore } = useStores();

    return (
        <div className="text-editor">
            <Editor 
                value={documentStore?.activeDocument?.body}
            />
        </div>
    )
}

export default observer(TextEditor)