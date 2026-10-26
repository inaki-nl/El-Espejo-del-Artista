import { Outlet } from "react-router";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero.tsx";

function MainLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        <Hero />
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
