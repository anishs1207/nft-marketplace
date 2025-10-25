export default function formatPrice(priceStr: string) {
    try {
        const bigIntPrice = BigInt(priceStr)

        const whole = bigIntPrice / BigInt(10 ** 6)
        const fraction = bigIntPrice % BigInt(10 ** 6)

        const wholeStr = whole.toString()
        let fractionStr = fraction.toString().padStart(6, "0")

        const trimmedFraction = fractionStr.replace(/0+$/, "")

        return trimmedFraction ? `${wholeStr}.${trimmedFraction} FLOW` : `${wholeStr}.0000 FLOW`
    } catch {
        return priceStr
    }
}

export function addDecimalsToPrice(priceStr: string) {
    try {
        const price = parseFloat(priceStr)
        const inSmallestUnits = price * 10 ** 6

        return Math.floor(inSmallestUnits).toString()
    } catch {
        return priceStr
    }
}
