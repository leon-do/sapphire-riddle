"use client";
import web3Onboard from "@/scripts/web3Onboard";
import { useState } from "react";
import { ethers } from "ethers";

export default function Home() {
  const [coupon, setCoupon] = useState("DezAsu3EQY3U");
  const [answer, setAnswer] = useState("OPL");

  let contract: any = null;
  const contractAddress = "0x532Bd3Ec7Df3d8587FC8B4218F18f387Bf86917C";
  const abi = [
    { inputs: [{ internalType: "string", name: "coupon", type: "string" }], name: "claimReward", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
    { inputs: [{ internalType: "string", name: "coupon", type: "string" }], name: "getQuestion", outputs: [{ internalType: "string", name: "", type: "string" }], stateMutability: "view", type: "function" },
    {
      inputs: [
        { internalType: "string", name: "coupon", type: "string" },
        { internalType: "string", name: "answer", type: "string" },
      ],
      name: "submitAnswer",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const handleConnect = async () => {
    const signer: any = await web3Onboard();
    contract = new ethers.Contract(contractAddress, abi, signer);
    alert("connected");
  };

  const handleGetQuestion = async () => {
    if (!contract) return alert("Connect first");
    const response = await contract.getQuestion(coupon);
    alert(response);
  };

  const handleAnswer = async () => {
    if (!contract) return alert("Connect first");
    const response = await contract.submitAnswer(coupon, answer);
    console.log(response)
    alert(JSON.stringify(response));
  };

  const handleClaimReward = async () => {
    if (!contract) return alert("Connect first");
    const response = await contract.claimReward(coupon);
    console.log(response)
    alert(response);
  };

  return (
    <>
      <div>
        <button onClick={() => handleConnect()}>Connect</button>
      </div>
      <div>
        <input onChange={(e) => setCoupon(e.target.value)} value={coupon}></input>
        <button onClick={() => handleGetQuestion()}>Get Question</button>
      </div>
      <div>
        <input onChange={(e) => setAnswer(e.target.value)} value={answer}></input>
        <button onClick={() => handleAnswer()}>Answer</button>
      </div>
      <div>
        <input onChange={(e) => setCoupon(e.target.value)} value={coupon}></input>
        <button onClick={() => handleClaimReward()}>Claim Reward</button>
      </div>
    </>
  );
}
