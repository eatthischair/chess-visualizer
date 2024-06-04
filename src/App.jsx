import './App.css';
import {State} from './ContextFiles/State.jsx';
import {MyProvider} from './ContextFiles/Provider.jsx';
function App() {
  return (
    <MyProvider>
      <div className="bg-gradient-to-t from-black to-gray-700 w-screen h-screen">
        <State />
      </div>
    </MyProvider>
  );
}

export default App;
