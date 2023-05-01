<template>
  <v-flex class="transparent">
    <v-row class="mt-2 mx-3">
      <v-col cols="12" md="12"> </v-col>
    </v-row>
    <v-card flat>
      <v-row class="mt-2 mx-3">
        <v-col cols="12" md="6">
          <span style="color:#165c77 ; margin-left: 10px; font-size:16px"
            >الضد
          </span>
        </v-col>
        <v-col cols="12" md="6">
          <div align="left" v-if="DataTable01.editedIndex === -1">
            <v-icon color="#165c77" class="mr-3" @click="DataTable01_Add()">
              mdi-plus-box
            </v-icon>

            <v-icon
              v-if="DataTable01.selected.length > 0"
              color="#165c77"
              class="mr-3"
              @click="DataTable01_Edit(DataTable01.selected[0])"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              v-if="DataTable01.selected.length > 0"
              color="#f44336"
              @click="DataTable01_Delete(DataTable01.selected[0])"
            >
              mdi-delete
            </v-icon>
          </div>
          <div v-if="DataTable01.editedIndex > -1" align="left">
            <v-icon color="#165c77" @click="DataTable01_Save()">
              mdi-content-save
            </v-icon>
            <v-icon color="#f44336" @click="DataTable01_Close()">
              mdi-window-close
            </v-icon>
          </div>
        </v-col>
      </v-row>
      <v-card class="mx-5 mt-1" outlined>
        <v-form ref="DataTable01_Form">
          <v-data-table
            ref="DataTable01"
            :headers="DataTable01.Headers"
            hide-default-footer
            :items="initValue"
            v-model="DataTable01.selected"
            :show-select="DataTable01.editedIndex > -1 ? false : true"
            single-select
            :footer-props="{
              'items-per-page-text': 'products per page',
            }"
          >
            <template slot="no-data">
              <tr style="visibility: hidden;" />
            </template>
            <!-- c01 -->
            <template
              style="vertical-align: text-bottom;"
              v-slot:[`item.c01`]="{ item }"
            >
              <neo-select
                ref="c01"
                v-model="DataTable01.editedItem.c01"
                :items="$t('F01020.DataTable01_c01_ITEMS')"
                return-object
                item-text="VALEUR"
                item-value="ID"
                :rules="[(v) => !!v || '']"
                v-if="item.id === DataTable01.editedIndex"
                width="50px"
              ></neo-select>
              <span v-else>{{ item.c01.VALEUR }} </span>
            </template>

            <!-- c02 -->
            <template
              style="vertical-align: text-bottom;"
              v-slot:[`item.c02`]="{ item }"
            >
              <neo-text-field
                ref="c02"
                v-model="DataTable01.editedItem.c02"
                :items="c02_ITEMS"
                return-object
                item-text="VALEUR"
                item-value="ID"
                multiple
                chips
                :rules="[(v) => !!v || '']"
                v-if="item.id === DataTable01.editedIndex"
                width="50px"
              ></neo-text-field>
              <span v-else>{{ item.c02 }} </span>
            </template>
            <!-- c03 -->
            <template
              style="vertical-align: text-bottom;"
              v-slot:[`item.c03`]="{ item }"
            >
              <neo-text-field
                ref="c03"
                v-model="DataTable01.editedItem.c03"
                :rules="[(v) => !!v || '']"
                v-if="item.id === DataTable01.editedIndex"
                width="50px"
                rows="2"
              ></neo-text-field>
              <p v-else>{{ item.c03 }}</p>
            </template>
            <!-- c04 -->
            <template
              style="vertical-align: text-bottom;"
              v-slot:[`item.c04`]="{ item }"
            >
              <neo-text-field
                ref="c04"
                v-model="DataTable01.editedItem.c04"
                :rules="[(v) => !!v || '']"
                v-if="item.id === DataTable01.editedIndex"
                width="50px"
                rows="2"
              ></neo-text-field>
              <p v-else>{{ item.c04 }}</p>
            </template>
            <!-- c05 -->
            <template
              style="vertical-align: text-bottom;"
              v-slot:[`item.c05`]="{ item }"
            >
              <neo-text-area
                ref="c05"
                v-model="DataTable01.editedItem.c05"
                :rules="[(v) => !!v || '']"
                v-if="item.id === DataTable01.editedIndex"
                width="50px"
                rows="2"
              ></neo-text-area>
              <p v-else>{{ item.c05 }}</p>
            </template>
          </v-data-table>
        </v-form>
      </v-card>
    </v-card>
    <v-row class="mt-2 mx-3">
      <v-col cols="12" md="12"> </v-col>
    </v-row>
  </v-flex>
</template>
<script>
// import { bus } from "../main";
export default {
  props: {
    initValue: {
      type: Array,
    },
  },
  data() {
    return {
      DataTable01: {
        Headers: [
          {
            text: "الصفة",
            value: "c01",
            width: "200px",
            sortable: false,
            align: "center",
          },

          {
            text: "الإسم  و اللقب",
            value: "c02",
            width: "400px",
            sortable: false,
            align: "center",
          },
          {
            text: "العنوان",
            value: "c03",
            width: "400px",
            sortable: false,
            align: "center",
          },
          {
            text: "المحامي",
            value: "c04",
            width: "100px",
            sortable: false,
            align: "center",
          },
          {
            text: "صيغة المحامي",
            value: "c05",
            width: "300px",
            sortable: false,
            align: "center",
          },
        ],
        message: "",
        action: "",
        editedIndex: -1,
        editedItem: {
          c01: "",
          c02: "",
          c03: "",
          c04: "",
          c05: "",
        },
        defaultItem: {
          c01: "",
          c02: "",
          c03: "",
          c04: "",
          c05: "",
        },
        selected: [],
        data: [],
      },
    };
  },

  computed: {
    nameRules() {
      return (v) => v.length <= 568 || "568 caractères au maximum";
    },
    RequiredRule() {
      return (v) => !!v || this.$t("Messages.Message001");
    },
    MinValueRule() {
      return (value) => value >= 1 || this.$t("Messages.Message002");
    },
    nRules() {
      return (v) =>
        /^[0-9]*$/.test(v) ||
        "Le nombre de décimales doit être inférieur ou égal à 0";
    },
  },
  methods: {
    DataTable01_Init() {
      this.DataTable01.data = [];
    },
    DataTable01_Add() {
      this.DataTable01.action = "ADD";
      var max = 0;
      if (this.DataTable01.data.length > 0) {
        const ids = this.DataTable01.data.map((object) => {
          return object.id;
        });
        console.log(ids);
        max = Math.max(...ids);
      }
      var addObj = [];
      addObj = Object.assign({}, this.DataTable01.defaultItem);
      console.log("addObj :", addObj);
      console.log("Max :", max);
      addObj.id = max + 1;
      this.DataTable01.data.push(addObj);
      this.DataTable01.editedIndex = addObj.id;
      this.DataTable01.editedItem = Object.assign({}, addObj);
      this.$emit("getDataTable", this.DataTable01);
    },
    DataTable01_Edit(item) {
      this.DataTable01.action = "EDIT";
      this.DataTable01.editedIndex = item.id;
      this.DataTable01.editedItem = Object.assign({}, item);
      this.$emit("getDataTable", this.DataTable01);
    },
    DataTable01_Delete(item) {
      this.DataTable01.action = "DELETE";
      const index = this.DataTable01.data.indexOf(item);
      this.DataTable01.data.splice(index, 1);
      this.DataTable01.editedIndex = -1;
      this.DataTable01.selected = [];
      this.$emit("getDataTable", this.DataTable01);
    },
    DataTable01_Close() {
      if (this.DataTable01.action == "ADD") {
        this.DataTable01_Delete(this.DataTable01.editedItem);
      }
      this.DataTable01.editedIndex = -1;
      this.DataTable01.action = "";
      this.$emit("getDataTable", this.DataTable01);
    },
    DataTable01_Save() {
      if (this.$refs.DataTable01_Form.validate()) {
        this.DataTable01.action = "";
        if (this.DataTable01.editedIndex > -1) {
          const index = this.DataTable01.data.findIndex((object) => {
            return object.id === this.DataTable01.editedIndex;
          });
          console.log("index : ", index);
          Object.assign(
            this.DataTable01.data[index],
            this.DataTable01.editedItem
          );
          this.DataTable01_Close();
        }
        this.$refs.c01.$children[0].focus();
        this.$emit("getDataTable", this.DataTable01);
      }
    },
  },
  mounted() {
    this.DataTable01.data = this.initValue;
    // bus.$on("getDataTableFromNotice01", (data) => {
    //   this.DataTable01.data = data;
    // });
    console.log("DataCard01F01006 | this.DataTable01 : ", this.DataTable01);
  },
};
</script>
<style></style>
