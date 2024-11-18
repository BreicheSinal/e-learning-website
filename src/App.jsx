import { Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";

const App = () => {
  console.log("App rerendered");

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
