import "./App.css";
import Cont from "./Cont";
import Contract from "./Contract";
import Web3AuthLogin from "./Web3AuthLogin";

function App() {
  return (
    <div className="App">
      <h1>Web3Auth Login</h1>
      <Web3AuthLogin />
      {/* <Cont /> npm install --save-dev hardhat web3
      <Contract /> */}
    </div>
  );
}

export default App;
