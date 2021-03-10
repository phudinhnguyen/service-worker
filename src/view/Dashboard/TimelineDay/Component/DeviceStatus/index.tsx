import React from "react"
import "./style.scss"

const DeviceStatus = props => {
    return <div className="device-status">
        <div className="status">
            <span className="label color-active">Active</span>
            <div className="full-status-bar">
                <div className="status-bar bg-active"></div>
            </div>
        </div>

        <div className="status">
            <span className="label color-inactive">In active</span>
            <div className="full-status-bar">
                <div className="status-bar bg-inactive"></div>
            </div>
        </div>

        <div className="status">
            <span className="label color-warranty">Warranty</span>
            <div className="full-status-bar">
                <div className="status-bar bg-warranty"></div>
            </div>
        </div>
    </div>
}

export default DeviceStatus