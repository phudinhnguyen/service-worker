import React from "react";
interface Iprops {
  title: any;
  className?: string;
  style?: object;
  index?: number;
}
const TitleComponent = (props: Iprops) => {
  const className = props?.index == 2 ? 'secondary-title' : 'main-title';
  return (
    <p className={`${className} ${props.className}`} style={props.style}>
      {props.title}
    </p>
  );
};

export default TitleComponent;
