import React from 'react';
import { Typography } from "antd"
import "./styles.scss";
import ThreeDotsComponent from '@view/shared/components/ThreeDotsComponent';

interface Props {
    data: any
}
const { Title, Text } = Typography
const ItemMediaTimeLine = (props: Props) => {
    const { data } = props
    const renderMediaByType = (data) => {
        const typeMedia = data.type.mediaTypeCode && data.type.split("/").length > 0 && data.type.split("/")[0] || ""
        switch (typeMedia) {
            case "audio":
                return <audio > <source src={data.source} /></audio>
            case "video":
                return <video > <source src={data.source} /></video>
            default:
                return <img src={data.source} alt={data.name} />
        }
    }

    const arrayAction = [
        {
            icon: "",
            name: "Select",
            color: "",
            key: "SELECT",
        },
        {
            icon: "",
            name: "Delete",
            color: "",
            key: "DELETE",
        },
        {
            icon: "",
            name: "Approve",
            color: "",
            key: "APPROVE",
        },
    ]
    const handleAction = (item, data?: any) => {

        switch (item.key) {
            case "SELECT":
                return console.log(item, data);
            case "DELETE":
                return console.log(item, data);
            case "APPROVE":
                return console.log(item, data);
            default:
                return console.log(item, data);
        }
    }
    return (
        <div className={"itemMediaList"}>
            <div className="action"><ThreeDotsComponent rotate={90} arrayAction={arrayAction} handleAction={handleAction} dataAction={data} /></div>
            <div className="content-item">
                <div className="text">
                    <Text ellipsis className="title">{data?.name}</Text>
                    <Text ellipsis className="description">{data?.descript}</Text>
                </div>
                <div className="dropBackground"></div>
            </div>
            {renderMediaByType(data)}

        </div>
    )
}

export default ItemMediaTimeLine
