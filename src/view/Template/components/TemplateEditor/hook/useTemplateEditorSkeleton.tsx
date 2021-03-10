import { useCallback, useEffect, useState } from "react";
import {
  IMediaTest,
  IPropertiesMedia,
  ISizeMedia,
  PropertiesMedia,
} from "../interface";
const ImageTest: Array<IMediaTest> = [
  {
    link:
      "https://q-xx.bstatic.com/xdata/images/hotel/840x460/239243499.jpg?k=1db8c170520372c2e1f9e80725d8871e12cfb6df47480b85623290460e8f2f22&o=",
    active: false,
    properties: new PropertiesMedia(100, 50, 0, 0, 0),
    propertiesShow: new PropertiesMedia(0, 0, 0, 0, 0),
  },
  {
    link:
      "https://q-xx.bstatic.com/xdata/images/hotel/840x460/268903267.jpg?k=960a52b522c3f4b37e0038a1fd935897015d2860d2b5db86037c34bda7b85636&o=",
    active: false,
    properties: new PropertiesMedia(200, 100, 50, 50, 0),
    propertiesShow: new PropertiesMedia(0, 0, 0, 0, 0),
  },
];
const sizeInitial: ISizeMedia = {
  width: 800,
  height: 450,
};
const getPercentByRatio = (width: number, height: number) => {
  const percent: number = width / height;

  const widthByPercent: number =
    percent >= 1 ? sizeInitial.width : sizeInitial.height * percent;

  const heightByPercent: number =
    percent >= 1 ? sizeInitial.width / percent : sizeInitial.height;

  const widthShowByPercent: number =
    percent >= 1
      ? widthByPercent
      : widthByPercent >= sizeInitial.width
      ? sizeInitial.width
      : widthByPercent;

  const heightShowByPercent: number =
    percent >= 1
      ? heightByPercent >= sizeInitial.height
        ? sizeInitial.height
        : heightByPercent
      : heightByPercent;

  return {
    percent: {
      number: percent,
      width: widthByPercent,
      height: heightByPercent,
      x: widthByPercent,
      y: heightByPercent,
    },
    showPercent: {
      width: widthShowByPercent,
      height: heightShowByPercent,
    },
  };
};

const getPercent = (numerator: number, denominator) => {
  return Math.round((numerator / denominator) * 100);
};
const getPropertiesByPercent = (properties: number, percent: number) => {
  return (properties * percent) / 100;
};

const useTemplateEditorSkeleton = (width: number, height: number) => {
  const { percent, showPercent } = getPercentByRatio(width, height);

  const [data, setData] = useState({
    dataMedia: [],
    indexMediaCurrent: 0,
    dataMediaUseProperties: [],
    keyChange: "",
  });

  const handleTemplateDetail = (dataMedia: Array<IMediaTest>) => {
    const dataMediaActive = dataMedia.map((x, index) => {
      const propertiesShow = {
        width: getPropertiesByPercent(x.properties.width, percent.width),
        height: getPropertiesByPercent(x.properties.height, percent.height),
        x: getPropertiesByPercent(x.properties.x, percent.width),
        y: getPropertiesByPercent(x.properties.y, percent.height),
        zIndex: x.properties.zIndex,
      };
      return {
        ...x,
        active: index == data.indexMediaCurrent,
        propertiesShow,
      };
    });
    setData((pre) => {
      return {
        ...pre,
        dataMedia: dataMediaActive,
        dataMediaUseProperties: dataMediaActive,
      };
    });
  };

  const handleChooseMediaBottom = useCallback(
    (indexMedia: number) => {
      const dataSetActiveIndex = data.dataMedia.map((x, index) => {
        return {
          ...x,
          active: index == indexMedia,
        };
      });
      setData((pre) => ({
        ...pre,
        dataMedia: dataSetActiveIndex,
        indexMediaCurrent: indexMedia,
      }));
    },
    [data]
  );

  const handleSendProperties = useCallback(
    (indexSend: number, properties: IPropertiesMedia) => {
      const dataSetProperties = data.dataMediaUseProperties.map(
        (item, index) => {
          if (indexSend == index) {
            return {
              ...item,
              properties: {
                ...properties,
                width: getPercent(properties.width, percent.width),
                height: getPercent(properties.height, percent.height),
                x: getPercent(properties.x, percent.width),
                y: getPercent(properties.y, percent.height),
              },
              propertiesShow: {
                ...properties,
              },
            };
          }
          return {
            ...item,
          };
        }
      );
      setData((pre) => ({ ...pre, dataMediaUseProperties: dataSetProperties }));
    },
    [data]
  );

  const handleChangeProperties = useCallback(
    (name: string, value: string) => {
      const dataSetProperties = data.dataMediaUseProperties.map(
        (item, index) => {
          if (data.indexMediaCurrent == index) {
            return {
              ...item,
              properties: {
                ...item.properties,
                [name]: value == "" || value == "-" ? 0 : parseInt(value),
              },
              propertiesShow: {
                ...item.propertiesShow,
                [name]:
                  value == "" || value == "-"
                    ? 0
                    : name == "zIndex"
                    ? value
                    : Math.round((percent[name] * parseInt(value)) / 100),
              },
            };
          }
          return {
            ...item,
          };
        }
      );
      setData((pre) => ({
        ...pre,
        dataMediaUseProperties: dataSetProperties,
        keyChange: name,
      }));
    },
    [data]
  );

  useEffect(() => {
    handleTemplateDetail(ImageTest);
  }, []);

  return {
    data: {
      data,
      percent,
      showPercent,
    },
    handle: {
      setData,
      handleTemplateDetail,
      handleChangeProperties,
      handleChooseMediaBottom,
      handleSendProperties,
    },
  };
};
export default useTemplateEditorSkeleton;
