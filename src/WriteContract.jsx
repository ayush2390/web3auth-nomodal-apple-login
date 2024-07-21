import React, { useEffect, useState } from "react";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import Web3 from "web3";

const WriteContract = () => {
  const chainConfig = {
    chainNamespace: "eip155",
    chainId: "0x1",
    rpcTarget: "https://rpc.ankr.com/eth",
    displayName: "Ethereum Mainnet",
    blockExplorerUrl: "https://etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  };

  const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });

  const web3auth = new Web3AuthNoModal({
    clientId: "Web3Auth-project-clientID", // Get it from Web3Auth Dashboard
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    privateKeyProvider,
  });

  const openloginAdapter = new OpenloginAdapter();
  web3auth.configureAdapter(openloginAdapter);

  const web3 = new Web3(web3auth.setProvider);

  const contractABI = [
    {
      inputs: [
        {
          internalType: "string",
          name: "initMessage",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "message",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "newMessage",
          type: "string",
        },
      ],
      name: "update",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  // Wait for deployment to finish
  const contractAddress = "contract-address";

  const contract = new web3.eth.Contract(
    JSON.parse(JSON.stringify(contractABI)),
    contractAddress
  );
  // Wait for deployment to finish
  let receipt;
  const writeContract = async () => {
    receipt = await contract.methods.update("W3A").send({
      from: (await web3.eth.getAccounts())[0],
    });
    return receipt;
  };

  return (
    <div>
      <button onClick={writeContract}>Write Contract</button>
    </div>
  );
};

export default WriteContract;
