import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./component/Header";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import { ToastContainer } from "react-toastify";

function App() {
   return (
      <>
         <Header />
         <ToastContainer />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
         </Routes>
      </>
   );
}

export default App;
