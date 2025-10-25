"use client"

import CakeNft from "@/components/(dashboard)/CakeNft"
import CakeViewNft from "@/components/(dashboard)/CakeViewNft"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { chainsToContracts } from "@/constants/constants"
import * as React from "react"
import {
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
  useChainId
} from "wagmi"
import { erc20Abi } from "@/constants/constants"
import { ethers } from "ethers"
import MintFlow from "@/components/(dashboard)/MintFlow";

export default function Home() {
  const account = useAccount()
  const chainId = useChainId()
  const chainSupported =
    chainId in chainsToContracts && chainsToContracts[chainId]?.cakeNft !== undefined
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const { address, isConnected } = useAccount()
  const [amount, setAmount] = React.useState("")
  const [recipient, setRecipient] = React.useState<any>("")
  const decimals = 6

  React.useEffect(() => {
    if (isConnected && address) setRecipient(address)
  }, [isConnected, address])

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!amount || !recipient) return

    writeContract({
      address: "0x29f32E5c09Edbb16BabA9e4a43CD9651E8Fd1785",
      abi: erc20Abi,
      functionName: "mint",
      args: [recipient, ethers.parseUnits(amount, decimals)],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })


  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-purple-400 text-center">
            Cake NFT Bakery
          </h1>

          {/* Connection Status */}
          {!account.isConnected ? (
            <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center shadow-lg">
              <p className="text-lg text-zinc-300 mb-4">
                Connect your wallet to interact with the Cake NFT contract
              </p>
            </div>
          ) : !chainSupported ? (
            <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center shadow-lg">
              <p className="text-lg text-red-500 mb-4">
                The current network is not supported. Please switch to a supported
                network.
              </p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          ) : (
            <>
              <CakeNft />
              <CakeViewNft />
              <MintFlow />
            </>
          )}
        </div>
      </main>
    </div>
  )
}
