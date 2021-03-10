import React from "react";
import "./style.scss";
const film = require("@assets/images/film.png");
const TemplateEditorOverlay = ({}) => {
  return (
    <div className="template-overlay">
      <div className="row template-overlay-skeleton">
        <div className="template-overlay-skeleton-item__video col-lg-8 d-flex justify-content-center align-items-center remove-padding-col">
          <div className="template-overlay-skeleton-item-box">
            <div className="film">
              <img src={film} alt="" />
            </div>
            <span className="text-center">
              Drop your video here or click to upload it.
            </span>
          </div>
        </div>
        <div className="template-overlay-skeleton-item__images col-lg-4 remove-padding-col">
          <div className="template-overlay-skeleton-item__images--first d-flex justify-content-center align-items-center">
            <div className="template-overlay-skeleton-item-box w-50">
              <div className="film">
                {/* <img src={film} alt="" /> */}
                <i className="fas fa-image template-font-image"></i>
              </div>
              <span className="text-center">
                Drop your image here or click to upload it.
              </span>
            </div>
          </div>
          <div className="template-overlay-skeleton-item__images--last d-flex justify-content-center align-items-center">
            <div className="template-overlay-skeleton-item-box w-50">
              <div className="film">
                <i className="fas fa-image template-font-image"></i>
              </div>
              <span className="text-center">
                Drop your image here or click to upload it.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default React.memo(TemplateEditorOverlay);
