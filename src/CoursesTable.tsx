import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
} from '@mui/material'
import { pollingIntervalMinutes } from './constants'

import { useGetCoursesQuery } from './services/reception'
import { formatTime } from './utils'

export function CoursesTable() {
    const {
        data: courses,
        isLoading,
        error: errorGettingCourses,
    } = useGetCoursesQuery(undefined, {
        refetchOnMountOrArgChange: true,
        pollingInterval: 60000 * pollingIntervalMinutes,
    })

    return isLoading ? (
        <div className="initial-loader full-height">
            <div className="align-center">
                <h3>Chargement...</h3>
                <CircularProgress />
            </div>
        </div>
    ) : errorGettingCourses ? (
        <div className="full-height">
            <div className="align-center">
                <p>La liste des séances est temporairement indisponible.</p>
            </div>
        </div>
    ) : (
        <main>
            {courses?.length === 0 ? (
                <div className="full-height">
                    <div className="align-center">
                        <p>Aucune formation prévue actuellement.</p>
                    </div>
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
                                    <TableCell className="cell">{formatTime({ dateString: course.start })}</TableCell>
                                    <TableCell>
                                        <strong className="with-ellipsis-course cell">{course.name}</strong>
                                    </TableCell>
                                    <TableCell className="no-wrap cell">{course.roomFloor}</TableCell>
                                    <TableCell className="no-wrap cell">{course.roomName}</TableCell>
                                    <TableCell>
                                        <span className="with-ellipsis-teachers cell">
                                            {course.tutors
                                                ?.map(({ firstName, lastName }) => `${lastName} ${firstName}`)
                                                .join(', ')}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </main>
    )
}
