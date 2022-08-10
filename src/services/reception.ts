import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const SERVICE_URL = 'http://localhost:4000'

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
        baseUrl: SERVICE_URL,
    }),
    endpoints: (builder) => ({
        getCourses: builder.query<Array<Course>, void>({
            query: () => `reception`,
        }),
    }),
})

export const { useGetCoursesQuery } = receptionApi
