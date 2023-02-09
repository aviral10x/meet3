import logo from './logo.svg';
import './App.css';
import SocialLogin from "@biconomy/web3-auth";
import {ethers} from 'ethers';
import "@biconomy/web3-auth/dist/src/style.css";


function App() {

  const handleLogin = async () => {
    try{
      // init wallet
const socialLoginSDK = new SocialLogin();
await socialLoginSDK.init('0x5');    // Enter the network id in init() parameter
socialLoginSDK.showConnectModal();

// show connect modal
socialLoginSDK.showWallet();

if (!socialLoginSDK?.web3auth?.provider) return;
const provder = new ethers.providers.Web3Provider(
    socialLoginSDK.web3auth.provider,
    );
const accounts = await provder.listAccounts();
console.log("EOA address", accounts)


    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="App">
      
        <button
          className="App-link"
          // href="https://reactjs.org"
          // target="_blank"
          onClick={() => handleLogin()}
          rel="noopener noreferrer"
        >
          Login
        </button>
       
      

    </div>
  );
}

export default App;
