import moment, { Moment } from 'moment';
import Schedule from './Entity';

export const getTotalDayInMonth = (moment: Moment) => {
    const year = moment.year()
    const month = moment.month() + 1
    const totalDay = new Date(year, month, 0).getDate()
    return {
        totalDay,
        listDayInMonth: Array.from(
            { length: totalDay },
            (x, i) => i + 1
        )
    }
}

export const getHourInDay = () => {
    return Array.from(
        { length: 24 },
        (x, i) => {
            const suffixes = i < 12 ? "AM" : "PM"
            return `${ i }:00 ${ suffixes }`
        }
    )
}

interface IGetHourInRange {
    startTime: string,
    endTime: string,
}

export const getListHourInRange = ({ startTime, endTime }: IGetHourInRange) => {
    // hh:mm:ss

    const getHour = (time: string) => {
        return +time.split(':')[ 0 ]
    }

    const hourInDay = Array.from(
        { length: 24 },
        (x, i) => {
            return i
        })

    let listHourInRange = []

    hourInDay.forEach(hour => {
        if (hour >= getHour(startTime) && hour <= getHour(endTime)) {
            listHourInRange.push(hour)
        }
    })
    return listHourInRange
}

interface IGetDayInSchedule {
    format: string
    scheduleRepeat: 0 | 1 | 2 | 3 | 4 // norepeat - daily - weekly - monthly - yearly
    scheduleDateTimeBegin: Moment
    scheduleDateTimeEnd: Moment
    scheduleRepeatValues: Array<string>
}

export const getDayInSchedule = (schedule: IGetDayInSchedule) => {
    const startYear = schedule.scheduleDateTimeBegin.year()
    const endYear = schedule.scheduleDateTimeEnd.year()

    const startMonth = schedule.scheduleDateTimeBegin.month() + 1
    const endMonth = schedule.scheduleDateTimeEnd.month() + 1

    const yearRange = Array.from(
        { length: endYear - startYear + 1 },
        (x, i) => i + startYear
    )

    const monthRange = Array.from(
        { length: endMonth - startMonth + 1 },
        (x, i) => String(i + startMonth).padStart(2, '0')
    )

    let dayInSchedule = []

    switch (schedule.scheduleRepeat) {
        case 2:
            let weekdays = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]

            const getDayByWeekday = (weekday) => {
                let day = weekdays.indexOf(weekday)
                let dayByWeekdays = []
                while (schedule.scheduleDateTimeBegin.day(7 + day).isBefore(schedule.scheduleDateTimeEnd)) {
                    dayByWeekdays.push(schedule.scheduleDateTimeBegin.clone().date());
                }
                return dayByWeekdays
            }

            schedule.scheduleRepeatValues.forEach(weekday => {
                getDayByWeekday(weekday).forEach(day => {
                    dayInSchedule.push(day)
                })
            })
            break;
        case 3:
            schedule.scheduleRepeatValues.forEach(day => {
                yearRange.forEach(year => {
                    monthRange.forEach(month => {
                        dayInSchedule.push(moment(`${ year }-${ month }-${ String(day).padStart(2, '0') }`, "YYYY-MM-DD"))
                    })
                })
            })
            break
        case 4:
            schedule.scheduleRepeatValues.forEach(monthDay => {
                yearRange.forEach(year => {
                    dayInSchedule.push(moment(`${ year }-${ monthDay }`, "YYYY-MM-DD"))
                })
            })

            break
        default:
            break;
    }

    console.log('dayInSchedule: ', dayInSchedule);
    return dayInSchedule
}

// {
//     scheduleId: string
//     scheduleDateTimeBeginStr: string
//     scheduleDateTimeEndStr: string 
//     scheduleTimeBeginStr: string 
//     scheduleTimeEndStr: string 
//     scheduleLoop: 0 1
//     deviceIds: string
//     playlistId: string
//     userId: string
//     scheduleRepeat: 0 1 2 3 4
//     scheduleRepeatValues: Array<string>
//     scheduleRepeatValueDetails: Array<string> (YYYY-MM-DD)
// }