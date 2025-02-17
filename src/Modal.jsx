import { useEffect, useRef } from 'react'

import { createPortal } from 'react-dom'

const Modal = ({ children }) => {
    const elRef = useRef(null);

    if(!elRef.current){
        // sets reference to the same div every time
        elRef.current = document.createElement("div")

    }
    useEffect(() => {
        // attaches reference (frozen object) to modal
        const modalRoot = document.getElementById('modal')
        modalRoot.appendChild(elRef.current);
        // cleanup function below so that it only runs once after it gets unmounted so it doesn't keep rendering a div infinitely
        return () => modalRoot.removeChild(elRef.current)
    }, [])
    return createPortal(<div>{children}</div>, elRef.current)
}

export default Modal