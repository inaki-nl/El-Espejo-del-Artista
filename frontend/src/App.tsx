import { Routes, Route } from "react-router";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
        <Route element={ <MainLayout/> }>
          <Route path="/" element={<HomePage />} />;
        </Route>
    </Routes>
  );
}

export default App;
