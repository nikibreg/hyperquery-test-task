import React from "react";
import Editor from "rich-markdown-editor";

import './TextEditor.css'

export const TextEditor = () => {
    return (
        <div className="text-editor">
            <Editor defaultValue="Hello world!" />
        </div>
    )
}

export default TextEditor