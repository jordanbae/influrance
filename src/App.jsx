import Header from "./components/Header/Header";
import style from "./styles/app.module.scss"
const App = () => {
  return (
    <div className={`bg-primary ${style.container}`}>
      <Header/>
    </div>
  ) 
};

export default App;
