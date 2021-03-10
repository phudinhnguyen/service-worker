import React, { ReactHTMLElement } from "react";
import {
  AliwangwangOutlined,
  AndroidOutlined,
  BankOutlined,
  SketchOutlined,
} from "@ant-design/icons";

const PlayList = require("@assets/icon/playlist.svg");
interface IListNav {
  title: string;
  icon?: any;
  path?: string;
  activePath: Array<string>;
  children: Array<Object>;
}
const listNav: Array<IListNav> = [
  {
    title: "Dashboard",
    icon: <AliwangwangOutlined />,
    path: "/",
    activePath: [ "/", "/timeline-time/", "/timeline-day" ],
    children: [],
  },
  {
    title: "Device",
    icon: <AndroidOutlined />,
    path: "/sss",
    activePath: [ "/sss" ],
    children: [],
  },
  {
    title: "Detail",
    icon: <BankOutlined />,
    path: "/aa",
    activePath: [ "/aa" ],
    children: [],
  },
  {
    title: "Media",
    icon: <img src={PlayList} />,
    path: "/media-library",
    activePath: [ "/media-library" ],
    children: [],
  },
  {
    title: "Templates",
    icon: <img src={PlayList} />,
    path: "/templates",
    activePath: [ "/templates" ],
    children: [],
  },
  {
    title: "TestHoa",
    icon: <SketchOutlined />,
    path: "/testHoa",
    activePath: [ "/testHoa" ],
    children: [
      {
        title: "Detail Test Hoa",
        icon: <BankOutlined />,
        path: "/aa",
        activePath: [ "/aa" ],
        children: [],
      },
      {
        title: "Edit test hoa",
        icon: <BankOutlined />,
        path: "/aa",
        activePath: [ "/aa" ],
        children: [],
      },
    ],
  },
];
export default listNav;
