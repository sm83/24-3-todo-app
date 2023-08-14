import TodoForm from './components/sidePanel/TodoForm/TodoForm';
import ColumnControl from './components/sidePanel/ColumnControl/ColumnControl';
import TodoAppBanner from './components/sidePanel/TodoAppBanner/TodoAppBanner';
import ColumnList from './components/appItself/ColumnList/ColumnList';
import TodoStatus from './components/sidePanel/Status/TodoStatus';

import './App.css';

function App() {
  return (
    <>
      <div className="App">
        <div className="sidePanelArea">
          <TodoAppBanner />
          <div className="sidePanel">
            <div className="sidePanelScroll">
              <TodoStatus />
              <TodoForm />
              <ColumnControl />
            </div>
          </div>
        </div>

        <div className="appItself">
          <ColumnList />
        </div>
      </div>
    </>
  );
}

export default App;
