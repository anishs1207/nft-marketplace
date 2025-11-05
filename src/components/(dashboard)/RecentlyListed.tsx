'use client'

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import NftBox from "./NftBox";
import { marketplaceAbi } from "@/constants/constants";

const MARKETPLACE_ADDRESS = "0xA02e49Fe843a19dc54d37EC4675611a04096b022";

export default function RecentlyListedNFTs() {
    const [nfts, setNfts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchListings() {
            const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_SEPOLIA_RPC);
            const contract = new ethers.Contract(MARKETPLACE_ADDRESS, marketplaceAbi, provider);

            // Example: try token IDs 1-10 (trial & error)
            const tokenIds = Array.from({ length: 20 }, (_, i) => i + 1);

            const activeListings = [];
            for (const tokenId of tokenIds) {
                try {
                    const listing = await contract.getListing("0x85457472Db2A41a761127E8d3db9348b35908deD", tokenId);
                    if (Number(listing.price) > 0) {
                        const nftContract = new ethers.Contract(
                            "0x85457472Db2A41a761127E8d3db9348b35908deD",
                            ["function tokenURI(uint256) view returns (string)"],
                            provider
                        );
                        let image = "/placeholder.png";
                        try {
                            const tokenUri = await nftContract.tokenURI(tokenId);
                            const res = await fetch(tokenUri);
                            const metadata = await res.json();
                            image = metadata.image;
                        } catch { }

                        activeListings.push({
                            nftAddress: "0x85457472Db2A41a761127E8d3db9348b35908deD",
                            tokenId: tokenId.toString(),
                            price: listing.price.toString(),
                            seller: listing.seller,
                            image,
                        });
                    }
                } catch { }
            }

            setNfts(activeListings.reverse());
        }

        fetchListings();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Recently Listed NFTs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {nfts.length > 0 ? (
                    nfts.map((nft, idx) => (
                        <NftBox
                            key={idx}
                            tokenId={nft.tokenId}
                            //@ts-expect-error
                            image={nft.image}
                            price={ethers.formatUnits(nft.price, 6)}
                            owner={nft.seller}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center text-zinc-500">No NFTs listed yet.</div>
                )}
            </div>
        </div>
    );
}
