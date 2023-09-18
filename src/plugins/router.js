import VueRouter from "vue-router";
import Vue from "vue";

import TaskInfoView from "@/views/task-info/TaskInfoView";
import MapView from "@/views/map/component/MapView"

Vue.use(VueRouter);

const routes = [
  {
    name: "home",
    path: "/",
    redirect: { name: "task-info" },
  },
  {
    name: "task-info",
    path: "/info",
    component: TaskInfoView,
  },
  {
    name: "map",
    path: "/map",
    component: MapView,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
