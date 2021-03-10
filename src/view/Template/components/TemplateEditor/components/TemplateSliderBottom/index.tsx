import React from "react";
import { ITemplateSliderBottom } from "../../interface";
import "./style.scss";

const TemplateSliderBottom = ({
  dataMedia,
  index,
  chooseMedia,
  isIndexCurrent,
}: ITemplateSliderBottom) => {
  return (
    <div
      className={`item-slider ${isIndexCurrent ? "item-slider-active" : ""}`}
      onClick={() => chooseMedia(index)}
    >
      <img src={dataMedia.link} alt="" />
    </div>
  );
};
export default React.memo(TemplateSliderBottom);
