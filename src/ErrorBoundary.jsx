import { Component } from 'react'  
import { Link } from '@tanstack/react-router'

class ErrorBoundary extends Component {
    state = { hasError: false}
    static getDerivedStateFromError(){
        return { hasError: true}
    }
    componentDidCatch(error, info){
        console.error('ErrorBoundary caught some stupid error', error, info)

    }
    render(){
        if(this.state.hasError){
            return(
                <div className="error-boundary">
                    <h2>Ruh Oh!</h2>
                    <p>
                        There was an error with this page.<Link to='/'>Click here</Link> to go back to home page.
                    </p>
                </div>
            )
        }
        // If I have an error boundary around my component than I'm an invisible path, otherwise display error
        // <ErrorBoundary>
        //     <h1>hi</h1>
        // </ErrorBoundary>
        return this.props.children
    }
}

export default ErrorBoundary