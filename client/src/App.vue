<template>
  <div id="app" :class="{ 'hide-menu': !isMenuVisible || !user }">
    <Header title="Vue Structure" :hideToggle="!user" :hideUserDropdown="!user" />
    <Menu v-if="user" />
    <Content />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    Header,
    Menu,
    Content,
    Footer
  },
  computed: mapState(["isMenuVisible", "user"]),
  data: function() {
    return { validatingToken: true };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const localJson = localStorage.getItem(userKey);
      this.$store.commit("setUser", null);

      if (!localJson) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }

      const json = localJson;
      const config = {
        headers: { Authorization: json }
      };

      const res = await axios.get(`${baseApiUrl}/users`, config);

      if (res.data) {
        this.$store.commit("setUser", json);
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }

      this.validatingToken = false;
    }
  },
  created() {
    this.validateToken();
  }
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas: "header header" "menu content" "menu footer";
}

#app.hide-menu {
  grid-template-areas: "header header" "content content" "footer footer";
}
</style>
