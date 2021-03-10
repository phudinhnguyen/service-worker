import React, { useState } from "react";
// import { useTranslate } from "@hook/useTranslate";
import { common } from "@translateKey/index";

interface Iprops {
  onChange?: (value) => void;
  onClick?: (value) => void;
  classNames?: string;
  placeholder?: string;
}

const SearchComponent = (props: Iprops) => {
  const { classNames } = props;
  const [valueInput, setValueInput] = useState("");
  // const { SEARCH } = useTranslate(common);
  return (
    <div
      className={`search-bar search-category  ${classNames ? classNames : ""}`}
    >
      <input
        type="text"
        className="form-search"
        onChange={(e) => {
          props.onChange(e.target.value);
          setValueInput(e.target.value);
        }}
        placeholder={props.placeholder || "Search" + "..."}
      />
      <a className="icon-search">
        <i
          className="fas fa-search"
          onClick={() => props.onClick(valueInput)}
        ></i>
      </a>
    </div>
  );
};

export default SearchComponent;
