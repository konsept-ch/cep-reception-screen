import { render, screen, within } from '@testing-library/react'
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

    const formattedDate = Intl.DateTimeFormat('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' }).format(
        new Date()
    )

    const { getByText } = within(screen.getByTestId('current-date'))

    expect(getByText(formattedDate)).toBeInTheDocument()
})

it('renders a link to CEP website', () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>
    )

    const { getByText } = within(screen.getByTestId('website-link'))

    expect(getByText('www.cep.swiss')).toBeInTheDocument()
})
