import { filterProps } from "framer-motion";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Packages from "./components/Packages/Packages";
import Reviews from "./components/Reviews/Reviews";
import Service from "./components/Service/Service";
import style from "./styles/app.module.scss";
import { Routes, Route, Link } from "react-router-dom";
// import Purchase from "./pages/Purchase"; OLD PURCHASE
import Login from "./pages/Login/Login";
import Purchase from "./pages/Purchase/Purchase";
import UserDashboard from "./pages/Dashboards/UserDashboard";

const App = () => {
  return (
    <div className={`bg-primary ${style.container}`}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Hero />
              <Service />
              <Packages />
              <Reviews />
              <Footer />
            </>
          }
        />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/login" element={<Login />} />
        <Route path="/udashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
