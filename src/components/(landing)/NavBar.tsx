"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, ShoppingBag, PlusCircle, Sparkles } from "lucide-react"

export default function NavBar() {
    const [open, setOpen] = useState(false)

    const navLinks = [
        { name: "Buy NFT", href: "/buy-nft", icon: <ShoppingBag className="w-4 h-4 mr-2" /> },
        { name: "Sell NFT", href: "/list-nft", icon: <PlusCircle className="w-4 h-4 mr-2" /> },
        { name: "Mint NFT & FLOW", href: "/", icon: <PlusCircle className="w-4 h-4 mr-2" /> },
    ]

    return (
        <nav className="w-full bg-black text-white border-b border-zinc-800 px-6 md:px-8 py-4 flex items-center justify-between shadow-lg xl:min-h-[77px]">
            {/* Left: Logo */}
            <div className="flex items-center gap-2 md:gap-4">
                <a href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                        MM
                    </div>
                    <h1 className="hidden md:block font-bold text-2xl tracking-tight">
                        MetaMint
                    </h1>
                </a>
            </div>

            {/* Middle: Desktop Links */}
            <div className="hidden md:flex gap-3 flex-1 justify-center">
                {navLinks.map((link) => (
                    <Button
                        key={link.name}
                        asChild
                        className="bg-purple-700 hover:bg-purple-800 text-white border-none rounded-xl shadow-md transition-transform hover:scale-105"
                    >
                        <a href={link.href} className="flex items-center">
                            {link.icon}
                            {link.name}
                        </a>
                    </Button>
                ))}
            </div>

            {/* Right: Connect + Mobile Hamburger */}
            <div className="flex items-center gap-2">
                {/* Desktop Connect */}
                <div className="hidden md:flex">
                    <ConnectButton showBalance={false} chainStatus="none" />
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="p-2 text-white hover:bg-purple-900 rounded-md transition"
                            >
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="right"
                            className="w-72 bg-black text-white p-6 flex flex-col h-full shadow-xl border-l border-zinc-800"
                        >
                            <div className="flex flex-col gap-4 mt-6">
                                {navLinks.map((link) => (
                                    <Button
                                        key={link.name}
                                        asChild
                                        className="w-full justify-start bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition-all flex items-center"
                                        onClick={() => setOpen(false)}
                                    >
                                        <a href={link.href} className="flex items-center w-full">
                                            {link.icon}
                                            {link.name}
                                        </a>
                                    </Button>
                                ))}
                                <div className="mt-6">
                                    {/* <ConnectButton showBalance={false} chainStatus="none" /> */}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    )
}
