import profileStore from "@modules/authentication/profileStore"
import deviceCalendarStore from "@modules/schedule/deviceCalendarStore"
import timeCalendarStore from "@modules/schedule/timeCalendarStore"
import translateStore from "@modules/translation/translateStore"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { getDefaultMiddleware } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
    profile: profileStore.reducer,
    translation: translateStore.reducer,
    deviceCalendar: deviceCalendarStore.reducer,
    timeCalendar: timeCalendarStore.reducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof rootReducer>

export default store