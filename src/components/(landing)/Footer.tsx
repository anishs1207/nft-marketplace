"use client"

import { Heart } from "lucide-react"

export default function Footer() {
    return (
        <footer className="w-full bg-black border-t border-zinc-800 py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-3">
                <p className="text-sm text-zinc-400">
                    © {new Date().getFullYear()}{" "}
                    <span className="text-purple-400 font-semibold">NFT Marketplace</span> • Built by{" "}
                    <span className="text-purple-500 font-bold">Anish Sabharwal</span>
                </p>

                <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Heart className="w-4 h-4 text-purple-500" />
                    <span>Made with passion for Web3</span>
                </div>

                <div className="h-[2px] w-24 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full mt-2" />
            </div>
        </footer>
    )
}
