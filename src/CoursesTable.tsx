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

import { CourseRow } from './CourseRow'
import { pollingIntervalMinutes } from './constants'
import { useGetCoursesQuery } from './services/reception'

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
                                <CourseRow course={course} key={course.id} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </main>
    )
}
