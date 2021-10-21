import React from "react";
import { Provider } from "mobx-react";
import stores from "./stores";

import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import TextEditor from "./components/TextEditor/TextEditor";

const App: React.FC = () => {
  return (
    <Provider {...stores}>
      <div className="app-container">
        <Sidebar />
        <TextEditor />
      </div>
    </Provider>
  );
};

export default App;
