import Vue from "vue";
import VueRouter from "vue-router";

import Auth from "@/components/Auth";
import Home from "@/components/Home";
import Motherboards from "@/components/Motherboards";
import MotherboardsForm from "@/components/MotherboardsForm";
import Cpus from "@/components/Cpus";
import Hdds from "@/components/Hdds";
import Ram from "@/components/Ram";
import NotFound from "@/components/NotFound";

Vue.use(VueRouter);

const routes = [
  { name: "auth", path: "/auth", component: Auth },
  { name: "home", path: "/", component: Home },
  { name: "home", path: "/home", component: Home },
  { name: "motherboards", path: "/motherboards", component: Motherboards },
  { name: "motherboards", path: "/motherboards/:id", component: Motherboards },
  {
    name: "motherboardsForm",
    path: "/motherboards/form",
    component: MotherboardsForm
  },
  {
    name: "motherboardsFormId",
    path: "/motherboards/form/:id",
    component: MotherboardsForm
  },
  { name: "cpus", path: "/cpu", component: Cpus },
  { name: "hdds", path: "/hdd", component: Hdds },
  { name: "ram", path: "/ram", component: Ram },
  { name: "404", path: "/404", component: NotFound },
  { name: "redirect", path: "*", redirect: "/404" }
];

export default new VueRouter({
  mode: "history",
  routes: routes
});
