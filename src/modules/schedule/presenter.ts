import store from '@modules/core/store/redux';
import Device from '@modules/device/entity';
import Pagination from '@modules/pagination/entitiy';
import User from '@modules/user/entity';
import moment, { Moment } from 'moment';
import deviceCalendarStore from './deviceCalendarStore';
import Schedule from './Entity';
import { getHourInDay, getTotalDayInMonth, getListHourInRange } from './helper';
import scheduleRepository from "./repository"
import timeCalendarStore from './timeCalendarStore';

let schedulePresenter = { ...scheduleRepository }

interface IGetCalendarOfDeviceByMonth {
    monthMoment: Moment,
    pagination: Pagination,
    search?: string,
    loadMore?: boolean,
}

schedulePresenter.getCalendarOfDeviceByMonth = async ({ monthMoment, pagination, search, loadMore = false }: IGetCalendarOfDeviceByMonth) => {
    const year: number = monthMoment.year()
    const month: number = monthMoment.month() + 1
    let { listDayInMonth, totalDay } = getTotalDayInMonth(monthMoment)

    const params = {
        DateFrom: monthMoment.format("YYYY-MM-01"),
        DateTo: monthMoment.format(`YYYY-MM-${ totalDay }`),
        PageSize: 10,
        PageNumber: pagination.currentPage < 1 ? 1 : pagination.currentPage,
        SearchContent: search || "",
    }

    return await scheduleRepository.getCalendarOfDeviceByMonth(params).then(res => {

        let deviceCalendar = {
            pagination: new Pagination(pagination),
            currentMonth: monthMoment,
            listDevice: []
        }

        res.data.forEach((item: { device: Device, listSchedule: Array<Schedule> }) => {
            // calendarOfDevice là biến phụ thuộc deviceCalendarStore
            let calendarOfDevice: Array<{ day: Moment, listSchedule: Array<Schedule> }> = listDayInMonth.map((day: number) => {
                return {
                    day: moment(`${ year }-${ month }-${ day }`),
                    listSchedule: []
                }
            })

            const pushScheduleToCalendarOfDevice = ({ day, schedule }) => {
                calendarOfDevice[ day - 1 ] = {
                    day: moment(`${ year }-${ month }-${ day }`),
                    listSchedule: [
                        ...calendarOfDevice[ day - 1 ].listSchedule,
                        schedule
                    ]
                }
            }

            item.listSchedule.forEach((schedule: Schedule) => {
                if (schedule.scheduleRepeatValueDetails) {
                    schedule.scheduleRepeatValueDetails.forEach(item => {
                        const day = moment(item, "YYYY-MM-DD").date()
                        pushScheduleToCalendarOfDevice({ day, schedule })
                    })
                } else {
                    listDayInMonth.forEach(day => {
                        // Nếu là kiểu day hoặc norepeat phải push vào calendarOfDevice những ngày trong khoảng đó
                        const startDay = moment(schedule.scheduleDateTimeBegin).date()
                        const endDay = moment(schedule.scheduleDateTimeEnd).date()
                        if (day >= startDay && day <= endDay) {
                            pushScheduleToCalendarOfDevice({ day, schedule })
                        }
                    })
                }
            })

            deviceCalendar.listDevice.push({
                device: item.device,
                calendar: calendarOfDevice
            })
        })

        //update store
        if (loadMore) {
            store.dispatch(
                deviceCalendarStore.actions.updateDeviceCalendar(deviceCalendar)
            )
        } else {
            store.dispatch(
                deviceCalendarStore.actions.fetchDeviceCalendar(deviceCalendar)
            )
        }

        return res
    })
}

interface IGetCalendarOfTimeByDay {
    monthMoment: Moment,
    deviceId: string
}

schedulePresenter.getCalendarOfTimeByDay = async ({ monthMoment, deviceId }: IGetCalendarOfTimeByDay) => {
    const year: number = monthMoment.year()
    const month: number = monthMoment.month() + 1
    let { listDayInMonth, totalDay } = getTotalDayInMonth(monthMoment)

    const params = {
        ScheduleDateBegin: monthMoment.format("YYYY-MM-01"),
        ScheduleDateEnd: monthMoment.format(`YYYY-MM-${ totalDay }`),
        DeviceId: deviceId,
    }

    return await scheduleRepository.getCalendarOfTimeByDay(params).then(res => {
        let listDayInMonthStore = listDayInMonth.map(day => {
            return {
                day: moment(`${ year }-${ month }-${ day }`),
                listTimeInDay: getHourInDay().map((hour, index) => {
                    return {
                        hour: index,
                        scheduleInfo: null
                    }
                }),
            }
        })

        res.listSchedule.map((item: { schedule: Schedule, author: User }) => {
            const { schedule, author } = item
            const listHourInRange = getListHourInRange({
                startTime: schedule.scheduleTimeBegin,
                endTime: schedule.scheduleTimeEnd
            })
            if (schedule.scheduleRepeat == 0 || schedule.scheduleRepeat == 1) {

                listDayInMonth.forEach(day => {
                    const startDay = moment(schedule.scheduleDateTimeBegin).date()
                    const endDay = moment(schedule.scheduleDateTimeEnd).date()

                    if (day >= startDay && day <= endDay) {
                        const dayMoment = moment(`${ year }-${ month }-${ day }`, 'YYYY-MM-DD')
                        let listTimeInDayStore = [ ...listDayInMonthStore[ dayMoment.date() - 1 ].listTimeInDay ]

                        listHourInRange.forEach(hour => {
                            listTimeInDayStore[ hour ] = {
                                scheduleInfo: { schedule, author },
                                hour,
                            }
                        })

                        listDayInMonthStore[ dayMoment.date() - 1 ] = {
                            day: dayMoment,
                            listTimeInDay: listTimeInDayStore
                        }
                    }
                })

            } else {
                schedule.scheduleRepeatValueDetails.forEach(day => {
                    const dayMoment = moment(day, 'YYYY-MM-DD')
                    let listTimeInDayStore = [ ...listDayInMonthStore[ dayMoment.date() - 1 ].listTimeInDay ]

                    listHourInRange.forEach(hour => {
                        listTimeInDayStore[ hour ] = {
                            scheduleInfo: { schedule, author },
                            hour,
                        }
                    })

                    listDayInMonthStore[ dayMoment.date() - 1 ] = {
                        day: dayMoment,
                        listTimeInDay: listTimeInDayStore
                    }
                })
            }
        })

        store.dispatch(timeCalendarStore.actions.fetchTimeCalendar({
            currentMonth: monthMoment,
            device: new Device(res.device),
            listDayInMonth: listDayInMonthStore,
        }))

        return res
    })
}

export default schedulePresenter 