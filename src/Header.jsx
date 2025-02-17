import { Link } from '@tanstack/react-router'
import { use } from 'react'
import { CartContext } from './contexts'


export default function Header(){
    
    const[cart] = use(CartContext)

    return(
        <nav>
            <Link>
                <h1 className="logo">Padre Gino's Pizza</h1>
            </Link>
                <div className="nav-cart">
                    <span className="nav-cart-number" data-testid="cart-number">{cart.length}</span>
                </div>
        </nav>
    )
}