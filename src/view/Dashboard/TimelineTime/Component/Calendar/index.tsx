import React, { useEffect, useRef, useState } from "react"
import moment from "moment"
import "./style.scss"
import { useSelector } from "react-redux"
import { RootState } from "@modules/core/store/redux"
import Schedule from "@modules/schedule/Entity"

const Calendar = (props) => {
    const { listDayInMonth } = useSelector((state: RootState) => state.timeCalendar)

    return <div className="calendar">
        {
            listDayInMonth.map((dayInMonth, dayIndex) => {
                return <div className="day-col">
                    {
                        dayInMonth.listTimeInDay.map((timeInDay, timeIndex) => {
                            const activeColor = (() => {
                                const currentDay = moment()
                                if (currentDay.isSame(dayInMonth.day, 'day')) return "#00B2CA"
                                if (currentDay.isAfter(dayInMonth.day)) return "#E15554"
                                if (currentDay.isBefore(dayInMonth.day)) return "#707070"
                            })()

                            const hasSchedule = (timeInDay) => {
                                if (timeInDay?.scheduleInfo) return true
                                return false
                            }

                            const sameSchedule = (schedule: Schedule) => {
                                const scheduleId = schedule?.scheduleId
                                const currentScheduleId = timeInDay?.scheduleInfo?.schedule?.scheduleId

                                if (scheduleId === currentScheduleId) return true
                                return false
                            }

                            const preTime = dayInMonth.listTimeInDay[ timeIndex - 1 ]
                            const nextTime = dayInMonth.listTimeInDay[ timeIndex + 1 ]
                            const timeOfPrevDay = listDayInMonth[ dayIndex - 1 ]?.listTimeInDay[ timeIndex ]
                            const timeOfNextDay = listDayInMonth[ dayIndex + 1 ]?.listTimeInDay[ timeIndex ]

                            return <div
                                className="time-in-day"
                                style={{
                                    border: !hasSchedule(timeInDay) && "1px solid rgb(92, 92, 92)",
                                }}
                            >
                                <div
                                    className={`${ hasSchedule(timeInDay) && "active-time" }`}
                                    style={{
                                        backgroundColor: activeColor,
                                        borderTopLeftRadius: !sameSchedule(preTime?.scheduleInfo?.schedule) && !sameSchedule(timeOfPrevDay?.scheduleInfo?.schedule) ? "30px" : 0,
                                        borderTopRightRadius: !sameSchedule(preTime?.scheduleInfo?.schedule) && !sameSchedule(timeOfNextDay?.scheduleInfo?.schedule) ? "30px" : 0,
                                        borderBottomRightRadius: !sameSchedule(nextTime?.scheduleInfo?.schedule) && !sameSchedule(timeOfNextDay?.scheduleInfo?.schedule) ? "30px" : 0,
                                        borderBottomLeftRadius: !sameSchedule(nextTime?.scheduleInfo?.schedule) && !sameSchedule(timeOfPrevDay?.scheduleInfo?.schedule) ? "30px" : 0,
                                    }}
                                ></div>
                            </div>
                        })
                    }
                </div>
            })
        }
    </div >
}

export default Calendar