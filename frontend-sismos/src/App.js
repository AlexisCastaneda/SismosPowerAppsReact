//import logo from './logo.svg';
//import './App.css';
import { Route, Routes } from "react-router-dom";

import Inicio from "./Components/Pages/Inicio";
import InicioPowerApps from "./Components/Pages/InicioPowerApss";
import InicioPowerAppsButton from "./Components/Pages/InicioPowerApssButton";
import ClosestOne from "./Components/Pages/ClosestOne"

import "../src/Components/Styles/bg.css"


function App() {
  return (
    <div className="App">   
        <Routes>
          <Route path="/" element={<Inicio/>}/>
          <Route path="/power" element={<InicioPowerApps/>}/>
          <Route path="/power/button" element={<InicioPowerAppsButton/>}/>
          <Route path="/power/closest" element={<ClosestOne/>}/>
        </Routes>
    </div>
  );
}

export default App;
