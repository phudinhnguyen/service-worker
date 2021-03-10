import Device from "./entity";

const deviceViewmodel = (device: Device) => {
    if (!device) return

    const getDetailStatus = (device: Device) => {
        if (device.deviceExpired == 1) return {
            statusName: "warenty",
            color: "#FFC81E"
        }

        if (device.deviceStatus == 1) return {
            statusName: "In-active",
            color: "#E15554"
        }

        if (device.deviceStatus == 2) return {
            statusName: "Active",
            color: "#7FB800"
        }
    }

    return {
        ...device,
        deviceStatus: getDetailStatus(device)
    }
}

export default deviceViewmodel