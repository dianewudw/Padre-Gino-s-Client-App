import { Suspense, useState, use } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createLazyFileRoute } from '@tanstack/react-router'
import getPastOrders from '../api/getPastOrders'
import getPastOrder from '../api/getPastOrder'
import Modal from '../Modal';
import ErrorBoundary from '../ErrorBoundary'
import { priceConverter } from '../useCurrency'


export const Route = createLazyFileRoute('/past')({
  component: ErrorBoundaryWrappedPastOrderRoutes,
})

function ErrorBoundaryWrappedPastOrderRoutes(){
    const [page, setPage] = useState(1);
    const loadedPromise = useQuery({
        queryKey:["past-orders", page],
        queryFn: () => getPastOrders(page),
        staleTime: 30000,
    }).promise
    return(
        <ErrorBoundary>
            <Suspense
            fallback={
                <div className="past-orders">
                    <h2>Loading Past Orders...</h2>
                </div>
            }
            >
            <PastOrdersRoute loadedPromise={loadedPromise} page={page} setPage={setPage} />
            </Suspense>/
        </ErrorBoundary>
    )
}
// moved query and page hooks to ErrorBoundary component to use hooks use and Suspense
// passes promise of data from outside of component
function PastOrdersRoute({ loadedPromise, page, setPage }) {    
    const data = use(loadedPromise)
    const [focusedOrder, setFocusedOrder ] = useState(null);
    const { isLoading: isLoadingPastOrder, data: pastOrderData} = useQuery({
        queryKey:['past-order', focusedOrder],
        queryFn:() => getPastOrder(focusedOrder),
        enabled: !!focusedOrder,
        staleTime:86400000, // one day in milliseconds
    })

    return (
        <div className="past-orders">
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Date</td>
                        <td>Time</td>
                    </tr>
                </thead>
            <tbody>
                {data.map((order) => (
                    <tr key={order.order_id}>
                        <td>
                            <button onClick={() => setFocusedOrder(order.order_id)}>
                            {order.order_id}
                            </button>
                        </td>
                        <td>{order.date}</td>
                        <td>{order.time}</td>
                    </tr>
                ))}
            </tbody>
            </table>
            <div className="pages">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                    Previous     
                </button>
                <div>{page}</div>
                <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
                    Next
                </button>
                {
                    focusedOrder ? (
                       <Modal>
                        <h2>Order # {focusedOrder}</h2>
                        {!isLoadingPastOrder ? (
                            <table>
                                <thead>
                                    <tr>
                                        <td>Image</td>
                                        <td>Name</td>
                                        <td>Size</td>
                                        <td>Quantity</td>
                                        <td>Price</td>
                                        <td>Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pastOrderData.orderItems.map((pizza) => (
                                        <tr key={`${pizza.pizzaTypeID}_${pizza.size}`}>
                                            <td>
                                                <img src={pizza.image} alt={pizza.name}/>
                                            </td>
                                            <td>{pizza.name}</td>
                                            <td>{pizza.size}</td>
                                            <td>{pizza.quantity}</td>
                                            <td>{priceConverter(pizza.price)}</td>
                                            <td>{priceConverter(pizza.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : <p>Loading... </p>}
                        <button onClick={() => setFocusedOrder()}>Close</button>
                       </Modal> 
                    ): null
                }
            </div>
        </div>
    )
}
