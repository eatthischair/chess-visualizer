import './App.css';
import {BigFunction} from './ContextFiles/BigFunction.jsx';
import {MyProvider} from './ContextFiles/Provider.jsx';
function App() {
  return (
    <MyProvider>
      <div className="bg-gradient-to-t from-black to-gray-700 w-screen h-screen">
        <BigFunction />
      </div>
    </MyProvider>
  );
}

export default App;
