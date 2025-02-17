const intl = new Intl.NumberFormat('en-us', {
    style:'currency',
    currency:'USD'
})

export const priceConverter = (price) => intl.format(price)

export default function useCurrency(price){
    return priceConverter(price)
}