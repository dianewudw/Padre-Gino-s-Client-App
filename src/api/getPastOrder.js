export default async function getPastOrder(order){
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await fetch(`/${apiUrl}/past-order/${order}`)
    const data = await response.json()
    return data;
}