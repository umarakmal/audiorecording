import "./css/App.css";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Menu from "./component/Menu";
import RecordVoice from "./component/RecordVoice";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <RecordVoice />
      <Footer />
      <aside className="control-sidebar control-sidebar-dark"></aside>
    </div>
  );
}

export default App;
