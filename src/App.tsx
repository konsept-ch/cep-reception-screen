import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

import { useGetCoursesQuery } from './services/reception'
import { formatDate } from './utils'

export function App() {
    const {
        data: courses,
        isLoading,
        error: errorGettingCourses,
    } = useGetCoursesQuery(undefined, { refetchOnMountOrArgChange: true, pollingInterval: 60000 * 2 })

    return isLoading ? (
        <div>Loading...</div>
    ) : errorGettingCourses ? (
        <div>We are sorry! There is an issue and we cannot display the courses right now</div>
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
                        <div>Aucune formation aujourd'hui</div>
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
                                            <TableCell>{course.roomFloor}</TableCell>
                                            <TableCell>{course.roomName}</TableCell>
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
