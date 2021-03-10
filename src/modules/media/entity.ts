import { TypeMedia } from "./interface";

class Media {
    _id: string = '' ;
    type:TypeMedia = "video"
    position:{
        x:number;
        y:number;
    }
    size:{
        width:number;
        height:number;
    }
    zIndex:number = 0;
    border:boolean = true;
    source:string;
    constructor(media) {
        if (!media) return
        Object.keys(this).forEach(key => {
            if (media[ key ]) {
                this[ key ] = media[ key ]
            }
        })
    }
}

export default Media