import CONFIG from "@config/index"
import { decode } from "jsonwebtoken"
import httpRepository from "@modules/core/repository/http"
import Media from "@modules/media/entity"

const img1 = require("@assets/images/media/eva-dang-EXdXLrZXS9Q-unsplash.png")
const img2 = require("@assets/images/media/eva-dang-EXdXLrZXS9Q-unsplash@2x.png")
const img3 = require("@assets/images/media/photo-1590374585407-9e2cc8fb7629.png")

const getListMedia = async (payload:{
    pageSize:number , current:number
}) => {
    // return await httpRepository.execute({
    //     path: '/auth/register',
    //     method: 'post',
    //     payload,
    //     config: { isPrivate: false }
    // })
    const jsonTemplate = [
        {
            id :"A0",
            position:{
                x:0,
                y:0
            },
            size:{
                width:244,
                height:138
            },
            zIndex: 0,
            border:true,
            type:"video",
            
            source:"https://youtu.be/loMlOMnVExc?list=RDCMUCviq8Ih6BhHmlLEtcXEG_XQ"
        },
        {
            id :"A1",
            position:{
                x:0,
                y:0
            },
            size:{
                width:244,
                height:138
            },
            zIndex: 0,
            border:true,
            type:"image",
            source:img1
        },
        {
            id :"A2",
            position:{
                x:0,
                y:0
            },
            size:{
                width:244,
                height:138
            },
            zIndex: 0,
            border:true,
            type:"image",
            source:img2
        },
        {
            id :"A3",
            position:{
                x:0,
                y:0
            },
            size:{
                width:244,
                height:138
            },
            zIndex: 0,
            border:true,
            type:"image",
            source:img3
        },
       
    ]
    const response =  jsonTemplate.map((jsonItem)=> new Media(jsonItem))
    return  response
}

export default {
    getListMedia
}