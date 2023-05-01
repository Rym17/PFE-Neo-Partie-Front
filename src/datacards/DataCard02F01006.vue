<template>
  <v-card flat>
    <v-card class="mx-5 mt-1" outlined>
      <v-form ref="DataTable01">
        <v-data-table
          ref="DataTable01"
          :headers="DataTable01.Headers"
          hide-default-footer
          :items="initValue"
          v-model="selected"
          show-select
          single-select
          :footer-props="{
            'items-per-page-text': '',
          }"
        >
          <template v-slot:top>
            <v-row class="mt-2 mx-3">
              <v-col cols="12" md="12"> </v-col>
            </v-row>
            <v-card class="mx-5 mt-1" outlined>
              <v-card-title class="pa-4">
                <label class="labelstyle"> </label>
              </v-card-title>
              <v-card-text class="px-4">
                <v-form ref="DataTable01_Form">
                  <v-row>
                    <!-- c01 -->
                    <v-col cols="12" sm="6" md="6">
                      <neo-search-field-new
                        :label="DataTable01.Headers[0].text"
                        ref="DataCard01_c01"
                        v-model="formItem.c01"
                        :datatable="DataTable01"
                        :rules="[(v) => !!v || '']"
                        rows="1"
                      ></neo-search-field-new>
                    </v-col>
                    <!-- c02 -->
                    <v-col cols="12" sm="6" md="6">
                      <neo-text-field
                        :label="DataTable01.Headers[1].text"
                        ref="DataCard01_c02"
                        v-model="formItem.c02"
                        :rules="[(v) => !!v || '']"
                        rows="1"
                      ></neo-text-field>
                    </v-col>
                    <!-- c03 -->
                    <v-col cols="12" sm="12" md="12">
                      <neo-text-field
                        :label="DataTable01.Headers[2].text"
                        ref="DataCard01_c03"
                        v-model="formItem.c03"
                        :rules="[(v) => !!v || '']"
                        rows="1"
                      ></neo-text-field>
                    </v-col>
                    <!-- c04 -->
                    <v-col cols="12" sm="6" md="6">
                      <neo-text-field
                        :label="DataTable01.Headers[3].text"
                        ref="DataCard01_c04"
                        v-model="formItem.c04"
                        :rules="[(v) => !!v || '']"
                        rows="1"
                      ></neo-text-field>
                    </v-col>
                    <!-- c05 -->
                    <v-col cols="12" sm="6" md="6">
                      <neo-text-field
                        :label="DataTable01.Headers[4].text"
                        ref="DataCard01_c05"
                        v-model="formItem.c05"
                        :rules="[(v) => !!v || '']"
                        rows="1"
                      ></neo-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-row class="mt-2 mx-3">
                  <v-col cols="12" md="6"
                    ><v-icon
                      v-if="selected.length > 0"
                      color="#f44336"
                      @click="DataTable01_Delete(DataTable01.selected[0])"
                    >
                      mdi-delete
                    </v-icon>
                  </v-col>
                  <v-col cols="12" md="6">
                    <div align="left" class="pa-0">
                      <v-icon
                        v-if="selected.length === 0"
                        color="#165c77"
                        class=""
                        @click="DataTable01_Add(formItem)"
                      >
                        mdi-plus-box
                      </v-icon>

                      <v-icon
                        v-if="selected.length > 0"
                        color="#f44336"
                        @click="DataTable01_Close()"
                      >
                        mdi-window-close
                      </v-icon>
                      <v-icon
                        v-if="selected.length > 0"
                        color="#165c77"
                        class=""
                        @click="DataTable01_Edit(formItem)"
                      >
                        mdi-content-save
                      </v-icon>
                    </div>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </template>
          <template slot="no-data">
            <tr style="visibility: hidden" />
          </template>
        </v-data-table>
      </v-form>
    </v-card>
  </v-card>
</template>
<script>
import { bus } from "../main";
export default {
  props: {
    initValue: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      selected: [],
      formItem: {
        c01: "",
        c02: "",
        c03: "",
        c04: "",
        c05: "",
        id: "",
      },
      DataTable01: {
        Headers: [
          {
            text: "الاسم و اللقب  ",
            value: "c01",
            width: "300px",
            sortable: false,
            align: "center",
          },
          {
            text: "الدائرة القضائية ",
            value: "c02",
            width: "300px",
            sortable: false,
            align: "center",
          },
          {
            text: "العنوان",
            value: "c03",
            width: "300px",
            sortable: false,
            align: "center",
          },
          {
            text: "الهاتف",
            value: "c04",
            width: "300px",
            sortable: false,
            align: "center",
          },
          {
            text: "البريد الالكتروني",
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
          id: "",
        },
        defaultItem: {
          c01: "",
          c02: "",
          c03: "",
          c04: "",
          c05: "",
          id: "",
        },
        data: [],
        selected: [],
      },
    };
  },
  watch: {
    selected: function(val) {
      if (val.length > 0) {
        this.formItem = val[0];
        console.log(".........selected :", val);
      } else {
        this.formItem = {
          c01: "",
          c02: "",
          c03: "",
          c04: "",
          c05: "",
          id: "",
        };
      }
    },
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
    DataTable01_Add() {
      var editedItem = [];
      editedItem = this.formItem;
      if (this.$refs.DataTable01_Form.validate()) {
        var max = 0;
        if (this.DataTable01.data.length > 0) {
          const ids = this.DataTable01.data.map((object) => {
            return object.id;
          });
          max = Math.max(...ids);
        }
        this.formItem.id = max + 1;
        this.DataTable01.editedItem = editedItem;
        this.DataTable01.data.push(this.DataTable01.editedItem);
        this.formItem = {
          c01: "",
          c02: "",
          c03: "",
          c04: "",
          c05: "",
          id: "",
        };
        this.$refs.DataTable01_Form.reset();
        this.selected = [];
        console.log("...DataTable01_Add | DataTable01 : ", this.DataTable01);
        console.log("...DataTable editedItem", this.DataTable01.editedItem);
        console.log("...DataTable formItem", this.formItem);
      }
      this.$emit("getDataTable", this.DataTable01);
    },
    DataTable01_Edit(item) {
      var editedItem = [];
      editedItem = this.formItem;
      console.log(
        "DataTable01_Edit | Begin...  this.DataTable01 ",
        this.DataTable01
      );
      console.log("DataTable01_Edit | item : ", item);
      if (this.$refs.DataTable01_Form.validate()) {
        this.DataTable01.editedIndex = this.DataTable01.data.indexOf(item);
        this.formItem = Object.assign({}, item);
        if (this.DataTable01.editedIndex > -1) {
          this.DataTable01.editedItem = editedItem;
          Object.assign(
            this.DataTable01.data[this.DataTable01.editedIndex],
            this.DataTable01.editedItem
          );
        } else {
          this.DataTable01.data.push(this.formItem);
        }
        this.formItem = {
          c01: [],
          c02: "",
          c03: "",
          c04: "",
          c05: "",
          id: "",
        };
        this.$refs.DataTable01_Form.reset();
        this.selected = [];
        console.log("...DataTable01_Edit | DataTable01 : ", this.DataTable01);
      }
      this.$emit("getDataTable", this.DataTable01);
    },
    DataTable01_Delete(item) {
      this.DataTable01.action = "DELETE";
      const index = this.DataTable01.data.indexOf(item);
      this.DataTable01.data.splice(index, 1);
      this.DataTable01.editedIndex = -1;
      this.selected = [];
      this.DataTable01.editedItem = {
        c01: [],
        c02: "",
        c03: "",
        c04: "",
        c05: "",
        id: "",
      };
      this.$refs.DataTable01_Form.reset();
      this.$emit("getDataTable", this.DataTable01);
    },
    DataTable01_Close() {
      this.selected1 = [];
    },
    DataTable01_Save() {
      console.log(
        "DataTable01_Save editedIndex : ",
        this.DataTable01.editedIndex
      );
      if (this.$refs.DataTable01_Form.validate()) {
        this.DataTable01.action = "";

        if (this.DataTable01.editedIndex > -1) {
          const index = this.DataTable01.data.findIndex((object) => {
            return object.id === this.DataTable01.editedIndex - 1;
          });
          console.log("index : ", index);
          Object.assign(
            this.DataTable01.data[index],
            this.DataTable01.editedItem
          );
          this.DataTable01_Close();
        }
        this.$refs.DataTable01_c01.$children[0].focus();
      }
      this.$emit("getDataTable", this.DataTable01);
    },
  },
  mounted() {
    bus.$on("SetSearchObject2", (data) => {
      this.formItem = data;
    });
    // bus.$on("getDataTableFromNotice05", (data) => {
    //   this.DataTable01.data = data;
    // });
    console.log("DataCard02F01006 | this.DataTable01 : ", this.DataTable01);
  },
};
</script>
<style></style>
