import Game from "./components/Game";
import Header from "./components/Header";
import Store from "./Store";

function App() {
  const { state, dispatch } = Store();

  return (
    <>
      <Header />
      <Game state={state} dispatch={dispatch} />
    </>
  );
}

export default App;
