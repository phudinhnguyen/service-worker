export interface IMediaTest {
  link: string;
  active: boolean;
  properties: IPropertiesMedia;
  propertiesShow: IPropertiesMedia;
}

export interface ITemplateSliderBottom {
  dataMedia: IMediaTest;
  index: number;
  chooseMedia: (index) => void;
  isIndexCurrent: boolean;
}

export interface IPropertiesMedia {
  width: number;
  height: number;
  x: number;
  y: number;
  zIndex: number;
}

export interface IResizeTemplate {
  link: string;
  active: boolean;
  indexCurrent: number;
  propertiesInitial: IPropertiesMedia;
  sendProperties: (indexCurrent: number, properties: IPropertiesMedia) => void;
  propertiesActive?: IPropertiesMedia;
  keyActive: string;
}

export interface ISizeMedia {
  width: number;
  height: number;
}

export interface ITemplateEditorSkeleton {
  size?: ISizeMedia;
}

export interface ITemplateTransform {
  properties: IPropertiesMedia;
  changeProperties: (name: string, value: string) => void;
}

export interface IPropertiesPercent {
  widthShow: number;
  heightShow: number;
  widthShowPercent: number;
  heightShowPercent: number;
}

export class PropertiesMediaNew {
  reality: IPropertiesMedia;
  show: IPropertiesMedia;
  percent: IPropertiesMedia;
  constructor(
    reality: IPropertiesMedia,
    show: IPropertiesMedia,
    percent: IPropertiesMedia
  ) {
    this.reality = reality;
    (this.percent = percent), (this.show = show);
  }
}

export class PropertiesMedia implements IPropertiesMedia {
  width: number;
  height: number;
  x: number;
  y: number;
  zIndex: number;
  constructor(
    width: number = 0,
    height: number = 0,
    x: number = 0,
    y: number = 0,
    zIndex: number = 0
  ) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.zIndex = zIndex;
  }
}
