"use client"

import * as React from "react"
import {
    type BaseError,
    useWriteContract,
    useWaitForTransactionReceipt,
    useAccount,
} from "wagmi"
import { erc20Abi } from "@/constants/constants"
import { ethers } from "ethers"
import { ConnectButton } from "@rainbow-me/rainbowkit"

export default function MintERC20() {
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

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({ hash })

    return (
        <div className="mt-10 flex items-center justify-center">
            <form
                className="max-w-2xl w-full mx-auto p-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-lg text-white flex flex-col gap-4"
                onSubmit={submit}
            >
                <h2 className="text-2xl font-semibold text-white text-center mb-4">
                    Mint FLOW Tokens
                </h2>

                <input
                    name="amount"
                    type="number"
                    placeholder={`Amount (decimals: ${decimals})`}
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    className="px-4 py-2 rounded-md bg-black/70 border border-purple-600/30 text-purple-100 placeholder-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                />

                <button
                    type="submit"
                    disabled={isPending || !amount || !recipient}
                    className={`cursor-pointer px-4 py-2 rounded-md text-white font-semibold transition-all duration-200 ${isPending
                        ? "bg-purple-800/60 cursor-not-allowed"
                        : "bg-purple-700 hover:bg-purple-800 shadow-lg shadow-purple-800/30"
                        }`}
                >
                    {isPending ? "Confirming..." : "Mint"}
                </button>

                {hash && (
                    <div className="text-sm text-purple-300 break-all">
                        Transaction Hash:
                        <a
                            href={`https://sepolia.etherscan.io/tx/${hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 underline ml-1 hover:text-purple-300"
                        >
                            {hash}
                        </a>
                    </div>
                )}

                {isConfirming && (
                    <div className="text-sm text-yellow-400 animate-pulse">
                        Waiting for confirmation...
                    </div>
                )}

                {isConfirmed && (
                    <div className="text-sm text-green-400">
                        ✅ Transaction confirmed!
                    </div>
                )}

                {error && (
                    <div className="text-sm text-red-400">
                        ⚠️ {(error as BaseError).shortMessage || error.message}
                    </div>
                )}
            </form>
        </div>
    )

}
