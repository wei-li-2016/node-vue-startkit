<template>
  <b-container fluid>
    <h3>Dashboard</h3>
    <hr />
    <div class="wrapper">
      <div class="card">
        <div class="icone icone-mb">
          <i class="fa fa-cube"></i>
        </div>
        <div class="conteudo">
          <span class="item-label">Motherboard</span>
          <span class="item-quantity">{{ quantityMbs }}</span>
        </div>
      </div>

      <div class="card">
        <div class="icone icone-cpu">
          <i class="fa fa-microchip"></i>
        </div>
        <div class="conteudo">
          <span class="item-label">CPU</span>
          <span class="item-quantity">{{ quantityCpus }}</span>
        </div>
      </div>

      <div class="card">
        <div class="icone icone-hdd">
          <i class="fa fa-hdd-o"></i>
        </div>
        <div class="conteudo">
          <span class="item-label">HDD</span>
          <span class="item-quantity">{{ quantityHdds }}</span>
        </div>
      </div>

      <div class="card">
        <div class="icone icone-ram">
          <i class="fa fa-tasks"></i>
        </div>
        <div class="conteudo">
          <span class="item-label">RAM</span>
          <span class="item-quantity">{{ quantityRam }}</span>
        </div>
      </div>

      <div class="card">
        <div class="icone icone-pws">
          <i class="fa fa-tasks"></i>
        </div>
        <div class="conteudo">
          <span class="item-label">Power Supply</span>
          <span class="item-quantity">{{ quantityPs }}</span>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import { userKey } from "@/global";
import axios from "axios";
import { baseApiUrl, showError } from "@/global";

export default {
  data() {
    return {
      quantityMbs: 0,
      quantityCpus: 0,
      quantityHdds: 0,
      quantityRam: 0,
      quantityPs: 0
    };
  },
  computed: mapState(["user"]),
  methods: {
    validateToken() {
      const json = localStorage.getItem(userKey);
      this.$store.commit("setUser", json);
    },
    async countItems() {
      axios
        .all([
          axios.get(`${baseApiUrl}/motherboards`),
          axios.get(`${baseApiUrl}/processors`)
        ])
        .then(
          axios.spread((...responses) => {
            this.quantityMbs = responses[0].data.length;
            this.quantityCpus = responses[1].data.length;
          })
        )
        .catch(showError);
    }
  },
  created() {
    this.validateToken();
    this.countItems();
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.wrapper {
  border-radius: 15px;
  grid-gap: 10px;
  margin-top: 20px;
  display: grid;
  grid-template-areas: "s s s s";
}

.card {
  display: grid;
  grid-template-areas: "icon content content";
}

.icone {
  font-size: 50px;
  color: #fff;
  align-items: center;
  text-align: center;
}

.icone-cpu {
  background-color: #dd4b39;
}

.icone-mb {
  background-color: #00c0ef;
}

.icone-hdd {
  background-color: #00a65a;
}

.icone-ram {
  background-color: #f39c12;
}

.icone-pws {
  background-color: #3e004b;
}

.conteudo {
  display: grid;
  grid-template-areas:
    "label label"
    "quantity";
}

.item-label {
  font-size: 18px;
  padding-left: 10px;
}

.item-quantity {
  font-size: 50px;
  font-weight: 700;
  padding-left: 10px;
}
</style>
