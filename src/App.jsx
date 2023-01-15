import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Packages from "./components/Packages/Packages";
import Service from "./components/Service/Service";
import style from "./styles/app.module.scss"
const App = () => {
  return (
    <div className={`bg-primary ${style.container}`}>
      <Header/>
      <Hero/>
      <Service/>
      <Packages/>
    </div>
  ) 
};

export default App;
