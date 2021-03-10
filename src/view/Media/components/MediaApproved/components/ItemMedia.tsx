import { Media } from '@modules/media/interface'
import React from 'react'

import "./styles.scss"

interface Props {
    data: Media;
    className?: string
}

const defaultImgae = require("@assets/images/default-images.png")
export const ItemMedia = (props: Props) => {
    const { data, className = "" } = props
    return (
        <div className={`item-media ${className}`} >
            {
                data.type == "image" && <img src={data.source} loading={"lazy"} />
            }
            {
                data.type == "video" && <video width="100%" loop controls autoplay class="connect-bg">
                    <source data-src={data.source} type="video/mp4" />
                </video>
            }
        </div>
    )
}
