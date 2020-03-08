<template>
  <b-container fluid>
    <h3>Motherboards Form</h3>
    <hr />

    <b-form v-if="show">
      <b-row>
        <b-col md="12" sm="12">
          <b-form-group label="Name:" label-for="name">
            <b-form-input
              id="name"
              type="text"
              required
              placeholder="Name is required"
              v-model="motherboard.name"
            />
          </b-form-group>
        </b-col>

        <b-col md="3" sm="12">
          <b-form-group label="Platform:" label-for="platform">
            <b-form-select
              id="platform"
              required
              :disabled="!motherboard.name || motherboard.name.length < 40"
              v-model="motherboard.platform"
              :options="platformOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="3" sm="12">
          <b-form-group label="Marca:" label-for="marca_id">
            <b-form-select
              id="marca_id"
              required
              :disabled="!motherboard.platform"
              v-model="motherboard.marca_id"
              :options="marcaOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="3" sm="12">
          <b-form-group label="Socket:" label-for="socket">
            <b-form-select
              id="socket"
              required
              :disabled="!motherboard.marca_id"
              v-model="motherboard.socket"
              :options="socketOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="3" sm="12">
          <b-form-group label="Chpiset:" label-for="chipset">
            <b-form-select
              id="chipset"
              required
              :disabled="!motherboard.socket"
              v-model="motherboard.chipset"
              :options="chipsetOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="3" sm="12">
          <b-form-group label="Format:" label-for="format">
            <b-form-select
              id="format"
              required
              :disabled="!motherboard.chipset"
              v-model="motherboard.format"
              :options="formatOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="3" sm="12">
          <b-form-group label="RGB Function:" label-for="rgb">
            <b-form-checkbox
              switch
              size="lg"
              id="checkbox-1"
              v-model="motherboard.rgb"
              name="checkbox-1"
              :value="1"
              :unchecked-value="0"
            ></b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>

      <b-button
        class="mt-3"
        :disabled="
          !motherboard.name ||
            !motherboard.platform ||
            !motherboard.marca_id ||
            !motherboard.socket ||
            !motherboard.chipset ||
            !motherboard.format
        "
        variant="secondary"
        @click="save"
      >
        <i class="fa fa-check"></i> Save
      </b-button>

      <b-button
        class="mt-3 ml-1"
        :disabled="!this.idEdit"
        variant="danger"
        @click="removeItem"
      >
        <i class="fa fa-trash"></i> Delete
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { baseApiUrl, showErrorForm, showError } from "@/global";
export default {
  name: "MotherboardsForm",
  data: function() {
    return {
      mode: "save",
      show: true,
      msgError: "A placa já existe",
      idEdit: false,
      motherboard: {
        name: ""
      },
      platformOptions: [
        { value: "AMD", text: "AMD" },
        { value: "INTEL", text: "INTEL" }
      ],
      marcaOptions: [
        { value: 3, text: "Nvidia" },
        { value: 4, text: "Galax" },
        { value: 5, text: "PowerColor" },
        { value: 6, text: "Gigabyte" },
        { value: 7, text: "Asus" },
        { value: 8, text: "ASRock" }
      ],
      socketOptions: [
        {
          label: "Intel",
          options: [
            { value: "LGA1156", text: "LGA 1156" },
            { value: "LGA1155", text: "LGA 1155" },
            { value: "LGA1150", text: "LGA 1150" },
            { value: "LGA1366", text: "LGA 1366" },
            { value: "LGA2011", text: "LGA 2011" },
            { value: "LGA2011-v3", text: "LGA 2011-v3" },
            { value: "LGA1151-rev2", text: "LGA 1151 rev 2" }
          ]
        },
        {
          label: "AMD",
          options: [
            { value: "AM3", text: "AM3" },
            { value: "AM4", text: "AM4" }
          ]
        }
      ],
      chipsetOptions: [
        {
          label: "AM3",
          options: [
            { value: "A75", text: "A75" },
            { value: "A78", text: "A78" },
            { value: "A85X", text: "A85X" },
            { value: "A88X", text: "A88X" }
          ]
        },
        {
          label: "AM4",
          options: [
            { value: "X570", text: "X570" },
            { value: "X470", text: "X470" },
            { value: "X370", text: "X370" },
            { value: "B450", text: "B450" },
            { value: "B350", text: "B350" },
            { value: "A320", text: "A320" }
          ]
        },
        {
          label: "LGA 1156",
          options: [
            { value: "H55", text: "H55" },
            { value: "H57", text: "H57" },
            { value: "P55", text: "P55" }
          ]
        },
        {
          label: "LGA 1155",
          options: [
            { value: "P67", text: "P67" },
            { value: "H61", text: "H61" },
            { value: "H67", text: "H67" },
            { value: "H77", text: "H77" },
            { value: "B65", text: "B65" },
            { value: "B75", text: "B75" },
            { value: "Z68", text: "Z68" },
            { value: "Z75", text: "Z75" },
            { value: "Z77", text: "Z77" }
          ]
        },
        {
          label: "LGA 1150",
          options: [
            { value: "H81", text: "H81" },
            { value: "H87", text: "H87" },
            { value: "H97", text: "H97" },
            { value: "B85", text: "B85" },
            { value: "Z87", text: "Z87" },
            { value: "Z97", text: "Z97" }
          ]
        },
        {
          label: "LGA 1366",
          options: [{ value: "X58", text: "X58" }]
        },
        {
          label: "LGA 2011",
          options: [{ value: "X79", text: "X79" }]
        },
        {
          label: "LGA 2011-v3",
          options: [{ value: "X99", text: "X99" }]
        },
        {
          label: "LGA 1151 rev 2",
          options: [
            { value: "Z370", text: "Z370" },
            { value: "H310", text: "H310" },
            { value: "B360", text: "B360" },
            { value: "B365", text: "B365" },
            { value: "H370", text: "H370" },
            { value: "Z390", text: "Z390" }
          ]
        }
      ],
      formatOptions: [
        { value: "FATX", text: "FlexATX" },
        { value: "MicroATX", text: "Micro ATX" },
        { value: "MiniATX", text: "Mini ATX" },
        { value: "StandardATX", text: "Standard ATX" },
        { value: "EATX", text: "Extended ATX" }
      ]
    };
  },
  methods: {
    save() {
      this.motherboard.socket == "LGA2011" ||
      this.motherboard.socket == "LGA1150" ||
      this.motherboard.socket == "LGA1156" ||
      this.motherboard.socket == "LGA1155" ||
      this.motherboard.socket == "LGA1366" ||
      this.motherboard.socket == "AM3"
        ? (this.motherboard.memory = "DDR3")
        : (this.motherboard.memory = "DDR4");

      !this.motherboard.rgb
        ? (this.motherboard.rgb = 0)
        : (this.motherboard.rgb = this.motherboard.rgb);

      if (this.idEdit) {
        axios
          .put(
            `${baseApiUrl}/motherboards/${this.$route.params.id}`,
            this.motherboard
          )
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.$router.push({ name: "motherboards" });
          })
          .catch(showErrorForm);
      } else {
        axios
          .post(`${baseApiUrl}/motherboards`, this.motherboard)
          .then(() => {
            this.$toasted.global.defaultSuccess();
            this.$router.push({ name: "motherboards" });
          })
          .catch(showErrorForm);
      }
    },
    verifyId() {
      if (this.$route.params.id) {
        axios
          .get(`${baseApiUrl}/motherboards/${this.$route.params.id}`)
          .then(res => {
            this.idEdit = true;
            this.motherboard.name = res.data.name;
            this.motherboard.platform = res.data.platform;
            this.motherboard.marca_id = res.data.marca_id;
            this.motherboard.chipset = res.data.chipset;
            this.motherboard.socket = res.data.socket;
            this.motherboard.format = res.data.format;
            this.motherboard.rgb = res.data.rgb;
          })
          .catch(err => {
            console.log(err.response);
          });
      }
    },
    removeItem() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          axios
            .delete(`${baseApiUrl}/motherboards/${this.$route.params.id}`)
            .then(() => {
              this.$toasted.global.defaultSuccess();
              this.$router.push({ name: "motherboards" });
            })
            .catch(showErrorForm);
        }
      });
    }
  },
  created() {
    this.verifyId();
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

.buttons-options {
  display: grid;
  grid-template-areas: "s s";
  justify-content: space-between;
}

.group-search-button {
  justify-self: right;
}

.complements {
  border-radius: 15px;
  grid-gap: 10px;
  display: grid;
  grid-template-areas: "s s";
  justify-content: stretch;
}

.itens-per-page {
  width: 40%;
}

.itens-pagination {
  display: grid;
  width: 50%;
  justify-self: right;
}

.page-link {
  color: rgb(87, 87, 87);
}

.page-item.active .page-link {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}
</style>
