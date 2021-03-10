import { Divider, Timeline } from "antd";
import TimelineItem from "antd/lib/timeline/TimelineItem";
import React, { useState } from "react";
import "./styles.scss";
interface Props {
  onSelectMonth?: (month: any) => void;
}

const data = [
  {
    label: "2022",
    children: [
      {
        label: "Feb",
        key: "Feb",
      },
      {
        label: "Jan",
        key: "Jan",
      },
    ],
    key: 2022,
  },
  {
    label: "2021",
    children: [],
    key: 2021,
  },
  {
    label: "2020",
    children: [
      {
        label: "Dec",
        key: "Dec",
      },
    ],
    key: 2020,
  },
  {
    label: "2021",
    children: [],
    key: 2021,
  },
  {
    label: "2020",
    children: [
      {
        label: "Dec",
        key: "Dec",
      },
    ],
    key: 2020,
  },
  {
    label: "2021",
    children: [],
    key: 2021,
  },
  {
    label: "2020",
    children: [
      {
        label: "Dec",
        key: "Dec",
      },
    ],
    key: 2020,
  },
  {
    label: "2021",
    children: [],
    key: 2021,
  },
  {
    label: "2020",
    children: [
      {
        label: "Dec",
        key: "Dec",
      },
    ],
    key: 2020,
  },
  {
    label: "2021",
    children: [],
    key: 2021,
  },
  {
    label: "2020",
    children: [
      {
        label: "Dec",
        key: "Dec",
      },
    ],
    key: 2020,
  },
  {
    label: "2021",
    children: [],
    key: 2021,
  },
  {
    label: "2020",
    children: [
      {
        label: "Dec",
        key: "Dec",
      },
    ],
    key: 2020,
  },
  {
    label: "2021",
    children: [],
    key: 2021,
  },
  {
    label: "2020",
    children: [
      {
        label: "Dec",
        key: "Dec",
      },
    ],
    key: 2020,
  },
  {
    label: "2021",
    children: [],
    key: 2021,
  },
  {
    label: "2020",
    children: [
      {
        label: "Dec",
        key: "Dec",
      },
    ],
    key: 2020,
  },
  {
    label: "2021",
    children: [],
    key: 2021,
  },
  {
    label: "2020",
    children: [
      {
        label: "Dec",
        key: "Dec",
      },
    ],
    key: 2020,
  },
  {
    label: "2021",
    children: [],
    key: 2021,
  },
  {
    label: "2020",
    children: [
      {
        label: "Dec",
        key: "Dec",
      },
    ],
    key: 2020,
  },
];
const TimeLineComponent = (props: Props) => {
  const [key, setKey] = useState([]);
  const [keyChild, setKeyChil] = useState(null);
  const handleSetKey = (item) => {
    const index = key.indexOf(item.key);
    const tempKey = key;

    if (index != -1) {
      tempKey.splice(index, 1);
    } else {
      tempKey.push(item.key);
    }
    setKey([...tempKey]);
  };
  const handleSetKeyChild = (item) => {
    if (keyChild === item.key) {
      return setKeyChil(null);
    }
    if (keyChild != item.key) {
      props.onSelectMonth && props.onSelectMonth(item.key);
      return setKeyChil(item.key);
    }
  };

  return (
    <div className="py-2 timeline-component">
      <Timeline>
        <TimelineItem
          dot={<div className="dot-year"></div>}
          position="left"
          label={"Present"}
        />
        {data.map((item) => {
          const isActive = key.indexOf(item.key) != -1;
          const isExistChildActive =
            item.children?.findIndex((item) => item.key === keyChild) != -1;

          return (
            <>
              <TimelineItem
                className={`${isExistChildActive ? "active" : ""}`}
                dot={
                  <div
                    onClick={() => handleSetKey(item)}
                    className="dot-year"
                  ></div>
                }
                position="left"
                label={item.label}
              />
              {item.children.length > 0 && (
                <div
                  className={`content-timeline-month ${
                    isActive ? "show-timeline" : "collapse-timeline"
                  }`}
                >
                  {item.children.map((itemChild) => {
                    const childrenActive = keyChild === itemChild.key;

                    console.log(childrenActive);
                    return (
                      <TimelineItem
                        className={`${childrenActive ? "active" : ""}`}
                        position="left"
                        label={
                          <div
                            className="custom-label"
                            onClick={() => handleSetKeyChild(itemChild)}
                          >
                            <span> {itemChild.label}</span>{" "}
                            <span className="divider-horizontal" />{" "}
                          </div>
                        }
                        dot={<span className="custom-dot-child"></span>}
                      />
                    );
                  })}
                </div>
              )}
            </>
          );
        })}
      </Timeline>
    </div>
  );
};

export default TimeLineComponent;
