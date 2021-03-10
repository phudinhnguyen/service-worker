import mediaPresenter from '@modules/media/presenter'
import React, { useState } from 'react'

interface Props {

}

const UseMediaApproved = () => {
    const [state, setState] = useState({
        listMedia: []
    })
    const [loading, setLoading] = useState(false)


    const getListMedia = () => {
        setLoading(true)
        mediaPresenter.getListMedia({ current: 1, pageSize: 10 }).then((res) => {
            setStateByKey(res, "listMedia")
            setLoading(false)
            return res
        })
    }
    const setStateByKey = (data, key) => {
        return setState(prev => ({
            ...prev,
            [key]: data
        }))
    }
    return {
        state,
        loading,
        getListMedia
    }

}

export default UseMediaApproved