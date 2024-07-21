// Web3AuthLogin.js
import React, { useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { WALLET_ADAPTERS } from "@web3auth/base";

if (typeof global === "undefined") {
  var global = window;
}

const clientId = "Web3Auth-project-clientID";

const chainConfig = {
  chainNamespace: "eip155",
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://images.toruswallet.io/ethereum.svg",
};

const Web3AuthLogin = () => {
  const [web3auth, setWeb3auth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initWeb3Auth = async () => {
      const privateKeyProvider = new EthereumPrivateKeyProvider({
        config: { chainConfig },
      });

      const web3authInstance = new Web3AuthNoModal({
        clientId,
        web3AuthNetwork: "sapphire_devnet",
        privateKeyProvider,
      });

      const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider,
        adapterSettings: {
          uxMode: "redirect",
          loginConfig: {
            jwt: {
              verifier: "verifier-name",
              typeOfLogin: "jwt",
              clientId: "Auth0-clientID",
            },
          },
        },
      });

      web3authInstance.configureAdapter(openloginAdapter);
      setWeb3auth(web3authInstance);

      await web3authInstance.init();
    };

    initWeb3Auth();
  }, []);

  const loginWithApple = async () => {
    if (!web3auth) return;

    try {
      const userInfo = await web3auth.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
        loginProvider: "jwt",
        extraLoginOptions: {
          domain: "Auth0-domain",
          verifierIdField: "sub",
          connection: "apple",
        },
      });
      setUser(userInfo);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <button onClick={loginWithApple}>Login with Apple</button>
      {user && <div>Welcome, {user.name}</div>}
    </div>
  );
};

export default Web3AuthLogin;
