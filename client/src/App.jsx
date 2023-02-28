import { filterProps } from "framer-motion";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Packages from "./components/Packages/Packages";
import Reviews from "./components/Reviews/Reviews";
import Service from "./components/Service/Service";
import style from "./styles/app.module.scss";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Purchase from "./pages/Purchase/Purchase";
import UserDashboard from "./pages/Dashboards/UserDashboard";
import Register from "./pages/Register/Register";
import AdminTables from "./pages/AdminTables/AdminTables";
import Edit from "./pages/Edit/Edit";
import Checkout from "./pages/Checkout/Checkout";
import SignIn from "./pages/Signin/Signin";
import Experiment from "./pages/Experiment/Experiment";
import QrModal from "./components/QrModal/QrModal";
import Buy from "./pages/Buy/Buy";
import Dashboard from "./pages/Dashboards/Dashboard";
import AgentDashboard from "./pages/Dashboards/AgentDashboard";
import Draft from "./pages/Draft/Draft";
import DraftBuy from "./pages/Buy/DraftBuy";
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
        <Route path="/register" element={<Register />} />
        <Route path="/admin-table" element={<AdminTables />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/exp" element={<Experiment />} />
        <Route path="/qr" element={<QrModal />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/draftbuy" element={<DraftBuy />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agentdashboard" element={<AgentDashboard />} />
        <Route path="/draft" element={<Draft />} />
      </Routes>
    </div>
  );
};

export default App;
