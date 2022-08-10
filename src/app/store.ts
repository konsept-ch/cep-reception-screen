import { configureStore } from '@reduxjs/toolkit'
import type { ThunkAction, Action } from '@reduxjs/toolkit'
import { receptionApi } from '../services/reception'

export const store = configureStore({
    reducer: {
        [receptionApi.reducerPath]: receptionApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([receptionApi.middleware]),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
