import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Resizable, ResizableBox } from "react-resizable";
import {
  IPropertiesMedia,
  IResizeTemplate,
  PropertiesMedia,
} from "../../interface";
import "./style.scss";

const ResizeTemplate = ({
  link,
  active,
  indexCurrent,
  propertiesActive,
  propertiesInitial,
  sendProperties,
}: IResizeTemplate) => {
  const [properties, setProperties] = useState<IPropertiesMedia>(
    propertiesInitial
  );
  const [isResize, setIsResize] = useState(false);

  useEffect(() => {
    console.log(
      propertiesInitial,
      "propertiesInitialpropertiesInitialpropertiesInitial"
    );
    setProperties(propertiesInitial);
  }, [propertiesInitial]);

  const noAction = () => {};

  useEffect(() => {
    if (active) {
      Object.keys(propertiesActive).forEach((key) => {
        propertiesActive[key] = propertiesActive[key]
          ? propertiesActive[key]
          : 0;
      });
      setProperties(propertiesActive);
    }
  }, [propertiesActive]);

  const handleStart = () => {
    setIsResize(true);
  };
  const handleDrag = (e, ui) => {
    const { x, y } = properties;
    setProperties((pre) => ({
      ...pre,
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    }));
    sendProperties(
      indexCurrent,
      new PropertiesMedia(
        properties.width,
        properties.height,
        x + ui.deltaX,
        y + ui.deltaY,
        properties.zIndex
      )
    );
  };

  const onResize = (event, { element, size, handle }) => {
    setIsResize(true);
    setProperties((pre) => ({
      ...pre,
      width: size.width,
      height: size.height,
    }));

    sendProperties(
      indexCurrent,
      new PropertiesMedia(
        size.width,
        size.height,
        properties.x,
        properties.y,
        properties.zIndex
      )
    );
  };
  return (
    <div style={{ position: "absolute" }}>
      <Draggable
        axis="x"
        handle=".handle"
        defaultPosition={{ x: properties.x, y: properties.y }}
        position={null}
        grid={[5, 5]}
        positionOffset={{ x: properties.x, y: properties.y }}
        scale={1}
        bounds={{ left: -4000, top: -4000, bottom: 4000, right: 4000 }}
        onStart={active ? handleStart : noAction}
        onDrag={active ? handleDrag : noAction}
        onStop={() => setIsResize(false)}
      >
        <Resizable
          className="box1"
          height={properties.height}
          width={properties.width}
          onResizeStop={(event: any, ele: any) =>
            active ? setIsResize(false) : noAction
          }
          onResize={(event: any, ele: any) =>
            active ? onResize(event, ele) : noAction
          }
          resizeHandles={["sw", "se", "nw", "ne", "w", "e", "n", "s"]}
        >
          <div
            className="box1 position-absolute"
            // ref={myRef}
            style={{
              // zIndex: props.zindex,
              zIndex: properties.zIndex,
              width: properties.width + "px",
              height: properties.height + "px",
              left: properties.x + "px",
              top: properties.y + "px",
              // transform: `translate(${deltaChange.y}px, ${deltaChange.x}px) translate(${deltaChange.y}px, ${deltaChange.x}px) !important`,
              // transform: 'none !important'
              // transform: `translate(${-deltaPosition.x}px,${deltaPosition.y}px)`
            }}
          >
            <div
              className={`handle position-relative handle-${properties.zIndex}`}
              style={{
                backgroundColor: "transfarent",
                width: "100%",
                height: "100%",
                borderRadius: "5px",
                zIndex: properties.zIndex,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              ></div>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                }}
                src={link}
              />
              {/* {props.media.mediaTypeCode.split("/")[0] === "image" && (
              
            )} */}
              {/* <Icon
              onClick={() => {
                removeMedia(props.media.mediaId);
              }}
              className={"remove-video text-danger"}
              type={"close"}
            /> */}
            </div>

            {/*<div>This readme is really dragging on...</div>*/}
          </div>
        </Resizable>
      </Draggable>
    </div>
  );
};
export default React.memo(ResizeTemplate);
