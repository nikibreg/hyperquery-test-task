import React, { useRef, useState } from "react";
// import { Provider } from "mobx-react";
// import Editor from "rich-markdown-editor";

// import stores from "./stores";

import "./Sidebar.css";

export const Sidebar = () => {
    const documents = [
        {title: 'a'},
        {title: 'a'}
    ]
    const sidebarRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(268);

    const startResizing = React.useCallback((mouseDownEvent) => {
        setIsResizing(true);
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = React.useCallback(
        (mouseMoveEvent) => {
        if (isResizing) {
            setSidebarWidth(
            mouseMoveEvent.clientX -
                (sidebarRef?.current as any)?.getBoundingClientRect().left
            );
        }
        },
        [isResizing]
    );

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
            <h2 className="document-container-title">Documents</h2>
            {
                documents.map(document => ( 
                    <button className="document">
                        <h5 className="document-title">{document.title}</h5>
                    </button>   
                ))
            }
        </menu>
        </div>
        <div className="sidebar-resizer" onMouseDown={startResizing} />
        </div>
    )
}

export default Sidebar;
