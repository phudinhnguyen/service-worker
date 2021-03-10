import Device from '@modules/device/entity'
import Pagination from '@modules/pagination/entitiy'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment, { Moment } from "moment"
import Schedule from './Entity'

export interface IDeviceCalenderStore {
    pagination?: Pagination,
    currentMonth?: Moment,
    listDevice?: Array<{
        device: Device,
        calendar: Array<{
            day: Moment,
            listSchedule: Array<Schedule>
        }>
    }>
}

const initialState: IDeviceCalenderStore = {
    pagination: new Pagination({}),
    currentMonth: moment(),
    listDevice: []
}

const deviceCalendarStore = createSlice({
    name: 'deviceCalendar',
    initialState: initialState as IDeviceCalenderStore,
    reducers: {
        fetchDeviceCalendar: (state, action: PayloadAction<IDeviceCalenderStore>) => {
            return action.payload
        },
        updateDeviceCalendar: (state, action: PayloadAction<IDeviceCalenderStore>) => {
            return {
                ...state,
                ...action.payload,
                listDevice: [
                    ...state.listDevice,
                    ...action.payload.listDevice
                ]
            }
        }
    }
})

export default deviceCalendarStore