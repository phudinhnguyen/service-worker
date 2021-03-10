import React, { useEffect, useRef, useState } from "react"
import useClickOutside from "@hook/useClickOutside"
import "./style.scss"
import { useHistory } from "react-router"
import { useSelector } from "react-redux"
import { RootState } from "@modules/core/store/redux"
import { getTotalDayInMonth } from "@modules/schedule/helper"
import moment from "moment"

const Calendar = (props) => {
    let playlistRef: { current } = useRef()
    const history = useHistory()
    const { listDevice: listDeviceCalendar, currentMonth } = useSelector((state: RootState) => state.deviceCalendar)
    const totalDayInMonth = getTotalDayInMonth(currentMonth).totalDay

    useClickOutside([ playlistRef ], (event) => {
        playlistRef.current.style.display = "none"
    })

    const isPlaylistOverflowY = (clientY: number) => {
        return document.body.clientHeight <= 232 + clientY
    }

    const isPlaylistOverflowX = (clientX: number) => {
        return document.body.clientWidth <= 260 + clientX
    }

    const onContextMenu = (e) => {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();

        playlistRef.current.style.display = "inline-block"
        playlistRef.current.style.left = e.clientX + "px"
        playlistRef.current.style.top = e.clientY + "px"

        if (isPlaylistOverflowY(e.clientY)) {
            playlistRef.current.style.top = e.clientY - 232 + "px"
        }

        if (isPlaylistOverflowX(e.clientX)) {
            playlistRef.current.style.left = e.clientX - 260 + "px"
        }
    }

    return <div className="device-calendar">
        {<div ref={playlistRef} className="playlists-in-device">
            <div className="device-title">
                <span>Device 115423</span>
                <i className="fas fa-info"></i>
            </div>
            <div className="playlist-list">
                {
                    Array(40).fill(1).map(playlist => {
                        return <div className="wrap-playlist-item" onClick={() => history.push("/")}>
                            <div className="playlist-item">
                                <span>Playlist01</span>
                                <span>01:05-01:29 AM</span>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>}
        {
            listDeviceCalendar.map((deviceCalendar) => {
                return <div className="device-row d-flex">
                    {
                        deviceCalendar.calendar.map((calendar, index) => {
                            const prevCalendar = deviceCalendar.calendar[ index - 1 ]
                            const nextCalendar = deviceCalendar.calendar[ index + 1 ]

                            const hasSchedule = (calendar) => {
                                if (!calendar) return
                                return calendar.listSchedule.length != 0
                            }

                            const isStartDay = (() => {
                                if (calendar.day.date() == 1) return true
                                if (!hasSchedule(prevCalendar)) return true
                                return false
                            })()

                            const isEndDay = (() => {
                                if (calendar.day.date() == totalDayInMonth) return true
                                if (!hasSchedule(nextCalendar)) return true
                                return false
                            })()

                            const activeColor = (() => {
                                const currentDay = moment()
                                if (currentDay.isSame(calendar.day, 'day')) return "#00B2CA"
                                if (currentDay.isAfter(calendar.day)) return "#E15554"
                                if (currentDay.isBefore(calendar.day)) return "#707070"
                            })()

                            return <span
                                key={calendar.day.format('YYYY-MM-DD')}
                                style={{ borderColor: hasSchedule(calendar) && !isEndDay && activeColor }}
                                className={`day`}
                                onContextMenu={onContextMenu}
                                onClick={() => history.push(`/timeline-time/?deviceId=${ deviceCalendar.device.deviceId }&activeDay=${ calendar.day.format("YYYY-MM-DD") }`)}
                            >
                                {
                                    hasSchedule(calendar) &&
                                    <div className={`
                                        ${ isStartDay && "start-day" }
                                        ${ isEndDay && "end-day" }
                                        active-day`}
                                        style={{ backgroundColor: activeColor }}
                                    >
                                    </div>
                                }
                            </span>
                        })
                    }
                </div>
            })
        }
    </div >
}

export default Calendar