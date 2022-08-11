import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children?: ReactNode
}

interface State {
    error: Error | null
    errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
    state: State = { error: null, errorInfo: null }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // eslint-disable-next-line no-console
        console.error('Uncaught error:', error, errorInfo)
        this.setState({
            error,
            errorInfo,
        })
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div className="full-height">
                    <div className="align-center">
                        <p>Il y a une erreur dans l'application et nous nous en excusons.</p>
                        <p>Merci de rafraîchir la page.</p>
                        {process.env.NODE_ENV === 'development' && (
                            <div className="component-stack">
                                <code>{this.state.errorInfo?.componentStack}</code>
                            </div>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
