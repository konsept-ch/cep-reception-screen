import { isRejectedWithValue } from '@reduxjs/toolkit'
// eslint-disable-next-line no-duplicate-imports
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        // eslint-disable-next-line no-console
        console.error('The action was rejected!')

        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.error(JSON.stringify(action.error))
        }
    }

    return next(action)
}
