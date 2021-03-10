import Loading from "@view/shared/components/Loading";
import LoadableRouter from "./loadableRouter";

export const privateRouter = new LoadableRouter({
  loading: Loading,
  routers: [
    {
      path: "/",
      exact: true,
      loader: () => import("@view/Dashboard/TimelineDay"),
    },
    {
      path: "/timeline-day",
      exact: true,
      loader: () => import("@view/Dashboard/TimelineDay"),
    },
    {
      path: "/timeline-time",
      exact: true,
      loader: () => import("@view/Dashboard/TimelineTime"),
    },
    {
      path: "/schedule-edit",
      exact: true,
      loader: () => import("../Schedule/ScheduleEdit"),
    },
    {
      path: "/media-library",
      exact: true,
      loader: () => import("../MediaLibrary/index"),
    },
    {
      path: "/templates",
      exact: true,
      loader: () => import("@view/Template/TemplateList"),
    },
    {
      path: "/media-library",
      exact: true,
      loader: () => import("../MediaLibrary/index"),
    },
    {
      path: "/testHoa",
      exact: true,
      loader: () => import("@view/TestHoa"),
    },
  ],
}).routers;

export const publicRouter = new LoadableRouter({
  loading: Loading,
  routers: [
    {
      path: "/login",
      exact: true,
      loader: () => import("../Login"),
    },
  ],
}).routers;
