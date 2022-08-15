import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Course {
    id: string
    start: string
    end: string
    roomName: string
    roomFloor: string
    teachers: Array<string>
    name: string
}

export const receptionApi = createApi({
    reducerPath: 'receptionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_SERVICES_URL,
    }),
    endpoints: (builder) => ({
        getCourses: builder.query<Array<Course>, void>({
            query: () => `reception`,
        }),
    }),
})

export const { useGetCoursesQuery } = receptionApi
