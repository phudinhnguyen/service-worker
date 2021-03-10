export interface Media {
    _id: string 
    position:PositionMedia
    size:SizeMedia
    zIndex:number
    border:boolean ;
    type:TypeMedia;
    source:string;
}
export interface SizeMedia {
    width:number;
    height:number;
}
export interface PositionMedia {
    x:number;
    y:number;
}
export type TypeMedia  = "video" | "image"