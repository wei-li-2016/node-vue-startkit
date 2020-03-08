<template>
  <aside class="menu" v-show="isMenuVisible">
    <router-link to="/home">
      <i class="fa fa-home"></i> Dashboard
    </router-link>
    <router-link to="/motherboards">
      <i class="fa fa-cube"></i> Motherboards
    </router-link>
    <router-link to="/cpu">
      <i class="fa fa-microchip"></i> Processors
    </router-link>
    <router-link to="/hdd">
      <i class="fa fa-hdd-o"></i> HDD's
    </router-link>
    <router-link to="/ram">
      <i class="fa fa-tasks"></i> RAM
    </router-link>
    <router-link to="/plower-supply">
      <i class="fa fa-plug"></i> Power Supply
    </router-link>
  </aside>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Menu",
  computed: mapState(["isMenuVisible"])
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #263241, #1e2227);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.menu a,
.menu a:hover {
  color: #fff;
  text-decoration: none;
}

.menu a i {
  margin: 10px;
  font-size: 25px;
}
.router-link-exact-active,
.router-link-active:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
