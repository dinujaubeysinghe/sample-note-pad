import {Route,Routes} from "react-router";

import HomePage from "./pages/HomePage";

const App = () => {
  return  <div>

      <button>Click Me</button>
      
      <Routes>
        <Route path ="/" element={<HomePage />}/>
      </Routes>

    </div>
};

export default App;