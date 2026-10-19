import { createContext, useState } from "react";
import "./global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import { Toaster } from "react-hot-toast";
import  Lang  from "./components/language/lang";
import SchoolPreview from "./pages/home/pages/school-preview/school_preview";
import PreviewCours from "./pages/home/pages/preview-cours/preview_cours";
import NoteDumper from "./pages/home/pages/note-dumper/note_dumper";


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
          <Route path="/" element={<Home />} />
          <Route path="/preview-school" element={<SchoolPreview />} />
          <Route path="/preview-cours" element={<PreviewCours />} />
          <Route path="/note-dumper" element={<NoteDumper />} />
        </Routes>
      </BrowserRouter>
    </TotalStudentContext.Provider>
  );
}

export default App;
