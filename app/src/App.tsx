import React from "react";
import { Provider } from "mobx-react";
import Editor from "rich-markdown-editor";

import stores from "./stores";

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";

const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <div className="app-container">
        <Sidebar />
        <Editor defaultValue="Hello world!" />
      </div>
    </Provider>
  );
};

export default App;
