import React from "react";
import { ITemplateSliderBottom, ITemplateTransform } from "../../interface";
import { keyPressOnlyNumber } from "@helper/functions";
import "./style.scss";

const TemplateTransform = ({
  properties,
  changeProperties,
}: ITemplateTransform) => {
  const handleChangeValueProperties = (e) => {
    changeProperties(e.target.name, e.target.value);
  };

  return (
    <div className="transform">
      <h6 className="title-transform">Transform</h6>
      <div className="title-transform-item">
        <div className="block-transform">
          <p className="title-transform-children">Position ( % )</p>
          <div className="d-flex">
            <div className="properties-transform-item">
              <span className="title-properties">X</span>
              <input
                type="text"
                value={properties.x.toString()}
                name="x"
                onChange={handleChangeValueProperties}
                className="input-transform"
                onKeyPress={keyPressOnlyNumber}
              />
            </div>
            <div>
              <span className="title-properties">Y</span>
              <input
                type="text"
                value={properties.y}
                name="y"
                onChange={handleChangeValueProperties}
                onKeyPress={keyPressOnlyNumber}
                className="input-transform"
              />
            </div>
          </div>
        </div>
        <div className="block-transform">
          <p className="title-transform-children">Size ( % )</p>
          <div className="d-flex">
            <div className="properties-transform-item">
              <span className="title-properties">Width</span>
              <input
                type="text"
                value={properties.width}
                name="width"
                onChange={handleChangeValueProperties}
                onKeyPress={keyPressOnlyNumber}
                className="input-transform"
              />
            </div>
            <div>
              <span className="title-properties">Height</span>
              <input
                type="text"
                value={properties.height}
                name="height"
                onChange={handleChangeValueProperties}
                onKeyPress={keyPressOnlyNumber}
                className="input-transform"
              />
            </div>
          </div>
        </div>
        <div>
          <p style={{ opacity: 0 }}>Z-index</p>
          <div className="d-flex">
            <div className="properties-transform-item">
              <span className="title-properties">Z-index</span>
              <input
                type="text"
                value={properties.zIndex}
                name="zIndex"
                onChange={handleChangeValueProperties}
                onKeyPress={keyPressOnlyNumber}
                className="input-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(TemplateTransform);
