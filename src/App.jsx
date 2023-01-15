import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import style from "./styles/app.module.scss"
const App = () => {
  return (
    <div className={`bg-primary ${style.container}`}>
      <Header/>
      <Hero/>
    </div>
  ) 
};

export default App;
