import { createContext, useState } from "react";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SchoolSetup from "./pages/school-config/SchoolSetup";
import Home from "./pages/home/home";
import Prof from "./pages/home/pages/prof/Prof";
import Eleves from "./pages/home/pages/eleves/eleves";
import Classes from "./pages/home/pages/classes/classes";
import { Toaster } from "react-hot-toast";
import  Lang  from "./components/language/lang";
import AnneeScolaire from "./pages/home/pages/annee_scolaire/annee_scolaire";
import Matiere from "./pages/home/pages/matiere/matiere";
import GroupeMatiere from "./pages/home/pages/groupe_matiere/groupe_matiere";
import Note from "./pages/home/pages/note/note";

export const TotalStudentContext = createContext();

function App() {
  const [totalStudent, setTotalStudent] = useState(0);
  return (
    <TotalStudentContext.Provider value={[totalStudent, setTotalStudent]}>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            iconTheme: {
              primary: "#0F40C1",
              secondary: "white",
            },
          },
          error: {
            style: {
              color: "red",
              backgroundColor: "#ffe1df",
            },
          },
        }}
      />
      <Lang />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SchoolSetup />} />
          <Route path="/home" element={<Home />}>
            <Route path="" element={<Prof />} />
            <Route path="eleves" element={<Eleves />} />
            <Route path="classes" element={<Classes />} />
            <Route path="annee-scolaire" element={<AnneeScolaire />} />
            <Route path="matiere" element={<Matiere />} />
            <Route path="groupe-matiere" element={<GroupeMatiere />} />
            <Route path="note" element={<Note />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TotalStudentContext.Provider>
  );
}

export default App;
