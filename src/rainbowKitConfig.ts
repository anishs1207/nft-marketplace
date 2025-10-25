// rainbowKitConfig.ts
import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { sepolia } from "wagmi/chains"

const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [sepolia],
    ssr: true,
})

export default config
