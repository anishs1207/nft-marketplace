import { test, expect } from "@playwright/test"

test.describe("NFT Marketplace UI", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000") // your dev server
    })

    // Test RootLayout renders
    test("renders RootLayout with NavBar and Footer", async ({ page }) => {
        // Check NavBar
        const nav = page.locator("nav")
        await expect(nav).toBeVisible()

        // Check Footer
        const footer = page.locator("footer")
        await expect(footer).toBeVisible()
        await expect(footer).toContainText("NFT Marketplace")
    })

    // Test NavBar links
    test("NavBar desktop links", async ({ page }) => {
        const buyLink = page.getByRole("link", { name: "Buy NFT" })
        const sellLink = page.getByRole("link", { name: "Sell NFT" })

        await expect(buyLink).toBeVisible()
        await expect(sellLink).toBeVisible()

        // Click Buy NFT and check URL
        await buyLink.click()
        await expect(page).toHaveURL(/buy-nft/)
    })

    // Test Mobile NavBar menu
    test("NavBar mobile menu opens and closes", async ({ page }) => {
        // Simulate mobile viewport
        await page.setViewportSize({ width: 375, height: 812 })

        const menuButton = page.locator("button:has(svg)")
        await menuButton.click()

        const sheet = page.locator("div[role='dialog']")
        await expect(sheet).toBeVisible()

        // Click a link inside sheet
        const buyNFTMobile = sheet.getByRole("link", { name: "Buy NFT" })
        await buyNFTMobile.click()

        await expect(page).toHaveURL(/buy-nft/)
    })

    // Test Home page connection messages
    test("Home page shows connect wallet message when not connected", async ({ page }) => {
        const connectMessage = page.locator("text=Connect your wallet to interact")
        await expect(connectMessage).toBeVisible()
    })
})
