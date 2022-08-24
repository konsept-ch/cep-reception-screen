import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { App } from './App'

it('renders loader', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )

    debugger
    expect(screen.getByText('Chargement...', { exact: false })).toBeInTheDocument()
})

it('renders formatted date', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )

    expect(screen.getByText('Chargement...', { exact: false })).toBeInTheDocument()
})
