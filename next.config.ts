import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    /* config options here */
}

export default nextConfig

const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
})

module.exports = withMDX({
    // Support MDX in pages or app router
    pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
})
