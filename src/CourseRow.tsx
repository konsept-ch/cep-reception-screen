import { TableCell, TableRow } from '@mui/material'

import { formatTime } from './utils'
import type { Course } from './services/reception'

export const CourseRow = ({ course }: { course: Course }) => (
    <TableRow>
        <TableCell className="cell">{formatTime({ dateString: course.start })}</TableCell>
        <TableCell>
            <strong className="with-ellipsis-course cell">{course.name}</strong>
        </TableCell>
        <TableCell className="no-wrap cell">{course.roomFloor}</TableCell>
        <TableCell className="no-wrap cell">{course.roomName}</TableCell>
        <TableCell>
            <span className="with-ellipsis-teachers cell">
                {course.tutors?.map(({ firstName, lastName }) => `${lastName} ${firstName}`).join(', ')}
            </span>
        </TableCell>
    </TableRow>
)
