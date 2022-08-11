import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { pollingIntervalMinutes } from './constants'

import { useGetCoursesQuery } from './services/reception'
import { formatDate } from './utils'

export function App() {
    const {
        data: courses,
        isLoading,
        error: errorGettingCourses,
    } = useGetCoursesQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000 * pollingIntervalMinutes,
    })

    return isLoading ? (
        <div>Chargement...</div>
    ) : errorGettingCourses ? (
        <div>
            <p>La liste des séances est temporairement indisponible.</p>
            <p>Peut-être le serveur est en redéploiement ou il n'y a pas de connexion internet.</p>
            <p>Nous allons reéssayer automatiquement à chaque {pollingIntervalMinutes} minutes.</p>
        </div>
    ) : (
        <div className="container">
            <div className="table-panel-container">
                <div>
                    <p>
                        <strong className="welcome-text">
                            {Intl.DateTimeFormat('fr-CH', { year: 'numeric', month: 'long', day: 'numeric' }).format(
                                new Date()
                            )}{' '}
                        </strong>
                        | Nous vous souhaitons la bienvenue dans les formations suivantes :
                    </p>
                    {courses?.length === 0 ? (
                        <div>
                            Aucune formation dans le prochain 1 heure et 30 minutes. Mise à jour automatique à chaque{' '}
                            {pollingIntervalMinutes} minutes.
                        </div>
                    ) : (
                        <TableContainer className="upcoming-courses-table" component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Début</TableCell>
                                        <TableCell>Formation</TableCell>
                                        <TableCell>Etage</TableCell>
                                        <TableCell>Salle</TableCell>
                                        <TableCell>Formateur(s)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {courses?.map((course) => (
                                        <TableRow key={course.id}>
                                            <TableCell>{`${formatDate({
                                                dateString: course.start,
                                                isTimeVisible: true,
                                            })}`}</TableCell>
                                            <TableCell>{course.name}</TableCell>
                                            <TableCell className="no-wrap">{course.roomFloor}</TableCell>
                                            <TableCell className="no-wrap">{course.roomName}</TableCell>
                                            <TableCell>{course.teachers?.join(', ')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </div>
            </div>
            <footer className="footer">
                Retrouvez toutes nos formations sur <strong>www.cep.swiss</strong>
            </footer>
        </div>
    )
}
