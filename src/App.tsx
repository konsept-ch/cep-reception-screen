import { CoursesTable } from './CoursesTable'
import { ErrorBoundary } from './ErrorBoundary'

export function App() {
    return (
        <>
            <header>
                <p className="welcome-paragraph">
                    <strong className="welcome-text">
                        {Intl.DateTimeFormat('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' }).format(
                            new Date()
                        )}
                    </strong>{' '}
                    | Nous vous souhaitons la bienvenue dans les formations suivantes :
                </p>
            </header>
            <ErrorBoundary>
                <CoursesTable />
            </ErrorBoundary>
            <footer className="footer">
                <p>
                    Retrouvez toutes nos formations sur{' '}
                    <a href="https://www.cep.swiss" target="_blank" rel="noreferrer" className="website-link">
                        <strong>www.cep.swiss</strong>
                    </a>
                </p>
            </footer>
        </>
    )
}
