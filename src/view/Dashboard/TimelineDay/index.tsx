import React, { useEffect, useMemo, useState } from "react"
import MonthPicker from "../Component/MonthPicker"
import DeviceStatus from "./Component/DeviceStatus"
const devide = require("@assets/images/tablet-and-cellphone.png")
import { Checkbox, Dropdown } from "antd"

import Search from "antd/lib/input/Search"
import moment, { Moment } from "moment"

import "./style.scss"
import Calendar from "./Component/Calendar"
import ListDevice from "./Component/ListDevice"
import MainTitleComponent from "@view/shared/components/MainTitleComponent"
import schedulePresenter from "@modules/schedule/presenter"
import { RootState } from "@modules/core/store/redux"
import { useSelector } from "react-redux"
import { useAsync } from "@view/shared/hook/useAsync"
import Pagination from "@modules/pagination/entitiy"
import { LoadingChild } from "@view/shared/components/Loading"
import { getDayInSchedule } from "@modules/schedule/helper"

const TimelineDay = props => {
    const { currentMonth, pagination } = useSelector((state: RootState) => state.deviceCalendar)
    const [ getCalendarOfDeviceByMonth ] = useAsync(schedulePresenter.getCalendarOfDeviceByMonth)

    useEffect(() => {
        getCalendarOfDeviceByMonth.execute({
            monthMoment: currentMonth,
            pagination: new Pagination({ currentPage: pagination.currentPage })
        })
        getDayInSchedule({
            format: "",
            scheduleRepeat: 2,
            scheduleDateTimeBegin: moment("2021-03-01", "YYYY-MM-DD"),
            scheduleDateTimeEnd: moment("2021-03-31", "YYYY-MM-DD"),
            scheduleRepeatValues: [ "Sun", "Fri" ]
        })

    }, [])

    const onChange = (month: Moment) => {
        getCalendarOfDeviceByMonth.execute({
            monthMoment: month,
            pagination: new Pagination({ currentPage: pagination.currentPage })
        })
    }

    const getTotalDayInMonth = (moment: Moment) => {
        const year = moment.year()
        const month = moment.month() + 1
        return new Date(year, month, 0).getDate()
    }

    const listDayInMonth = (() => {
        return Array.from(
            { length: getTotalDayInMonth(currentMonth) },
            (x, i) => i + 1
        )
    })()

    const dropdownMenu = <div className="dropdown-menu">
        <div className="status">Active</div>
        <div className="status">In Active</div>
        <div className="status">Warranty</div>
        <div className="status">More...</div>
    </div>

    return <div className="dashboard">
        <MainTitleComponent
            title="Dashboard"
            breadcrumbs={[
                { name: "Devices" }
            ]}
        />

        <DeviceStatus />

        <div className="device-schedule">
            <div className="header-filter-data">
                <div className="device-filter">
                    <div style={{ height: "114px", paddingRight: "10px" }}>
                        <div className="header">
                            <div className="title">
                                <img className="mr-2" src={devide} alt="device" />
                                <span>Devices</span>
                            </div>
                            <Dropdown
                                trigger={[ 'click' ]}
                                overlay={dropdownMenu}
                            >
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    All device <i className="fas fa-sort-down ml-2"></i>
                                </a>
                            </Dropdown>
                        </div>
                        <Checkbox onChange={() => { }}>Check all devices</Checkbox>
                        <Search className="my-2" onSearch={() => { }} />
                    </div>
                </div>
                <div className="wrap-calendar">
                    <MonthPicker value={currentMonth} onChange={onChange} />
                    <div className="list-day-in-monh">
                        {
                            listDayInMonth.map((day, index) => {
                                return <div key={index} className="day">
                                    {day}
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="list-device-by-calendar" style={{ opacity: getCalendarOfDeviceByMonth.status == "loading" ? ".5" : 1 }}>
                <ListDevice />
                <Calendar />
                {
                    getCalendarOfDeviceByMonth.status == "loading" &&
                    <div className="calendar-loading">
                        <LoadingChild />
                    </div>
                }
            </div>
        </div>
    </div>
}

export default TimelineDay