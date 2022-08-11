import { CoursesTable } from './CoursesTable'

export function App() {
    return (
        <>
            <p className="welcome-paragraph">
                <strong className="welcome-text">
                    {Intl.DateTimeFormat('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' }).format(
                        new Date()
                    )}
                </strong>{' '}
                | Nous vous souhaitons la bienvenue dans les formations suivantes :
            </p>
            <CoursesTable />
            <footer className="footer">
                <p>
                    Retrouvez toutes nos formations sur <strong>www.cep.swiss</strong>
                </p>
            </footer>
        </>
    )
}
