import TodoForm from './components/sidePanel/TodoForm/TodoForm';
import ColumnControl from './components/sidePanel/ColumnControl/ColumnControl';
import TodoAppBanner from './components/sidePanel/TodoAppBanner/TodoAppBanner';
import ColumnList from './components/appItself/ColumnList/ColumnList';

import './App.css';
import { useAppSelector } from './hooks';

function App() {
  const { loading, todoError } = useAppSelector((state) => state.todos);

  return (
    <>
      <div className="App">
        <div className="sidePanelArea">
          <TodoAppBanner />
          <div className="sidePanel">
            <div className="sidePanelScroll">
              {loading && <h2>Loading...</h2>}
              {todoError && <h2>An error occured: {todoError}</h2>}

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
