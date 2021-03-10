import React from "react";
import useTemplateEditorSkeleton from "../../hook/useTemplateEditorSkeleton";
import { ITemplateEditorSkeleton } from "../../interface";
import ResizeTemplate from "../ResizeTemplate";
import TemplateEditorOverlay from "../TemplateEditorOverlay";
import TemplateSliderBottom from "../TemplateSliderBottom";
import TemplateTransform from "../TemplateTransform";
import "./TemplateStyle.scss";

const TemplateEditorSkeleton = ({
  size = {
    width: 16,
    height: 9,
  },
}: ITemplateEditorSkeleton) => {
  const {
    data: { data, showPercent },
    handle: {
      handleTemplateDetail,
      handleChangeProperties,
      handleChooseMediaBottom,
      handleSendProperties,
    },
  } = useTemplateEditorSkeleton(size.width, size.height);

  return (
    <>
      <div
        className="editor-skeleton"
        // style={{ width: `${ratio.width}px`, height: `${ratio.height}px` }}
      >
        {/* <TemplateEditorOverlay /> */}
        <div className="row-position row-top">{size.width}</div>
        <div className="row-position row-left">{size.height}</div>
        <div
          className="editor-skeleton-block"
          style={{
            width: `${showPercent.width}px`,
            height: `${showPercent.height}px`,
          }}
        >
          {data.dataMedia.map((x, index) => (
            <ResizeTemplate
              link={x.link}
              active={x.active}
              indexCurrent={index}
              propertiesActive={
                data.dataMediaUseProperties[data.indexMediaCurrent]
                  .propertiesShow
              }
              keyActive={data.keyChange}
              propertiesInitial={x.propertiesShow}
              sendProperties={handleSendProperties}
            />
          ))}
        </div>
      </div>
      <div className="editor-bottom">
        {data.dataMedia.map((x, index) => (
          <TemplateSliderBottom
            key={index}
            dataMedia={x}
            index={index}
            isIndexCurrent={data.indexMediaCurrent == index}
            chooseMedia={handleChooseMediaBottom}
          />
        ))}
      </div>
      {data.dataMediaUseProperties[data.indexMediaCurrent] && (
        <div className="editor-transform">
          <TemplateTransform
            properties={
              data.dataMediaUseProperties[data.indexMediaCurrent].properties
            }
            changeProperties={handleChangeProperties}
          />
        </div>
      )}
    </>
  );
};
export default React.memo(TemplateEditorSkeleton);
