
import './App.css';
import Header from'./components/Header/Header';
import Inbox from "./containers/Inbox/Inbox"

function App() {
  return (
    <div className="App">
    <Header>
    </Header>

    <section> 
    <Inbox />
    </section>

  </div>
  );
}

export default App;
