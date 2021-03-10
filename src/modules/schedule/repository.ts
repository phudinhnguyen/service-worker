import httpRepository from '@modules/core/repository/http';
import Device from '@modules/device/entity';
import Pagination from '@modules/pagination/entitiy';
import User from '@modules/user/entity';
import Schedule from './Entity';

type IGetCalendar = {
    data: Array<{
        device: Device,
        listSchedule: Array<Schedule>
    }>
    info: Pagination,
}

const getCalendarOfDeviceByMonth = async (params) => {
    return await httpRepository.execute({
        path: '/api/Schedule/calendar',
        params,
        convert: (res) => {
            if (!res) return
            const data = res.pagedData.map(item => {
                return {
                    device: new Device(item.device),
                    listSchedule: item.scheduleItems.map(schedule => {
                        return new Schedule(schedule)
                    })
                }
            })

            const info = new Pagination({
                pageSize: res.pageInfo.pageSize,
                currentPage: res.pageInfo.currentPage,
                total: res.pageInfo.totalPages
            })

            return { data, info } as IGetCalendar
        }
    })
}

const getCalendarOfTimeByDay = async (params) => {
    return await httpRepository.execute({
        path: '/api/Schedule/getScheduleByDevice',
        params,
        convert: (res) => {
            if (!res) return

            const listSchedule = res.schedules.map(item => {
                return {
                    schedule: new Schedule({
                        ...item,
                        scheduleRepeatValueDetails: item.scheduleRepeatValueDetailData
                    }),
                    author: new User(item.user)
                }
            })

            return {
                device: new Device(res.device),
                listSchedule
            }
        }
    })
}

const addSchedule = (payload) => {
    httpRepository.execute({
        path: "/api/Schedule",
        method: "post",
        payload,
    })
}

const editSchedule = (payload) => {
    httpRepository.execute({
        path: "/api/Schedule",
        method: "put",
        payload,
    })
}

export default {
    getCalendarOfDeviceByMonth,
    getCalendarOfTimeByDay
}