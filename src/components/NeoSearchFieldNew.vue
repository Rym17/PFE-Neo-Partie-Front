<template>
  <div class="neosearchfield">
    <label class="labelstyle"
      >{{ label }}
      <span
        v-show="isRequired"
        style="color:red ; margin-left: 10px; margin-right: 10px"
      >
        *
      </span>
    </label>
    <v-text-field
      slot="activator"
      class="inputStyle"
      v-bind="$attrs"
      v-on="$listeners"
      append-icon="search"
      @click:append="DisplaySearch"
      outlined
      dense
      :rules="rules"
    >
    </v-text-field>
    <v-dialog v-model="dialog" fullscreen>
      <v-card outlined>
        <v-card-text>
          <v-row class="mx-2 mt-5">
            <v-col cols="12" sm="2" md="2" lg="2">
              <neo-text-field
                label="الدائرة القضائية "
                ref="recherche"
                v-model="filters.search1"
              ></neo-text-field>
            </v-col>
            <v-col cols="12" sm="2" md="2" lg="2">
              <neo-text-field
                label="العنوان"
                ref="recherche"
                v-model="filters.search2"
              ></neo-text-field>
            </v-col>
            <v-col cols="12" sm="2" md="2" lg="2">
              <neo-text-field
                label="الهاتف"
                ref="recherche"
                v-model="filters.search3"
              ></neo-text-field>
            </v-col>
            <v-col cols="12" sm="2" md="2" lg="2">
              <neo-text-field
                label="البريد الالكتروني"
                ref="recherche"
                v-model="filters.search4"
              ></neo-text-field>
            </v-col>
            <v-col cols="12" md="1" sm="1" lg="1">
              <v-btn
                height="27"
                depressed
                class="mt-7 white--text"
                color="#165c77"
                @click="searchItems()"
              >
                ابحث
              </v-btn>
            </v-col>
          </v-row>

          <v-card class="mx-5 mt-7 mt-1" outlined>
            <v-data-table
              ref="DataTable"
              :headers="DataTable.Headers"
              hide-default-footer
              :items="DataTable.data"
              v-model="DataTable.selected"
              @input="DataTable_Select()"
              show-select
              single-select
              :footer-props="{
                'items-per-page-text': '',
              }"
            >
            </v-data-table>
          </v-card>
        </v-card-text>

        <v-card-actionss>
          <v-spacer></v-spacer>

          <v-btn color="#165c77" text @click="dialog = false">
            إغلاق
          </v-btn>
        </v-card-actionss>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { bus } from "../main";
export default {
  props: {
    label: {
      type: String,
    },
    rules: {
      type: Array,
      required: false,
      MinValue: false,
      RequiredRule: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    // datatable: {
    //   type: Object,
    //   default: null,
    // },
  },
  data: () => {
    return {
      searchResult: {},
      filters: { search1: "", search2: "", search3: "", search4: "" },
      dialog: false,
      DataTable: {
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
        data: [
          {
            c01: "aa",
            c02: "aa",
            c03: "aa",
            c04: "aa",
            c05: "aa",
            id: 1,
          },
          {
            c01: "bb",
            c02: "bb",
            c03: "bb",
            c04: "bb",
            c05: "bb",
            id: 2,
          },
          {
            c01: "cc",
            c02: "cc",
            c03: "cc",
            c04: "cc",
            c05: "cc",
            id: 3,
          },
        ],
        selected: [],
      },
    };
  },
  methods: {
    DataTable_Select() {
      console.log("DataTable_Select | selected ", this.DataTable.selected);
      if (this.DataTable.selected[0] != undefined) {
        this.searchResult = this.DataTable.selected[0];
        this.dialog = false;
        this.DataTable.selected = [];
      }
      bus.$emit("SetSearchObject2", this.searchResult);
    },
    searchItems() {
      var data = this.DataTable.data.filter(
        (word) =>
          word.c02 == this.filters.search1 &&
          word.c03 == this.filters.search2 &&
          word.c04 == this.filters.search3 &&
          word.c05 == this.filters.search4
      );
      this.DataTable.data = data;
      console.log("searchItems | DataTable", this.DataTable);
    },
    DisplaySearch() {
      this.DataTable.selected = [];
      console.log(
        "NeoSerarchField | DisplaySearch | DataTable",
        this.DataTable
      );
      this.dialog = true;
      this.filters = { search1: "", search2: "", search3: "", search4: "" };
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

.v-application--is-ltr {
  .v-input__append-inner {
    margin-top: 1px !important;
  }
  .neosearchfield {
    .v-input__icon {
      margin: -5px !important;
    }
    .v-input__slot {
      font-size: $elise-font-size-3 !important;
      outline: none;
      outline-color: initial;
      outline-style: none;
      outline-width: inherit;
      box-sizing: border-box;
      min-height: 28px !important;

      border: 1px !important;
      // background-color: #ffff;
      background-color: $color-blue-catskill-white;
    }
    .mdi-calendar::before {
      content: "\F00ED";
      margin-bottom: 20px !important;
      margin-left: -12px !important;
    }
    .v-input--is-disabled .v-input__slot {
      background-color: transparent !important;
      border: 1px solid !important;
      border-color: #e2e2e2 !important;

      input {
        color: black !important;
      }
    }
    .inputStyle {
      font-family: $elise-font-style;
      font-size: $content-font-size;
    }
    .labelstyle {
      color: $color-blue-blumine;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: 16px;
      margin-left: 10px;
    }
    .labelRequiredstyle {
      color: $color-red;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $content-font-size;
      margin-left: 10px;
    }
    .v-input__slot::after {
      border: 1px solid !important;
    }
    .input {
      border-radius: 1px !important;
    }
    .v-input__control {
      display: flex;
      flex-direction: column;
      height: auto;
      flex-grow: 1;
      flex-wrap: wrap;
      min-width: 0;
      height: 15px !important;
    }
    .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
      > .v-input__control
      > .v-input__slot
      fieldset {
      color: #f3f8f9 !important;
      border: 1px !important;
      height: 10px;
    }

    .v-text-field__details {
      position: absolute;
      display: flex;
      flex: 1 0 auto;
      max-width: 100%;
      min-height: 14 px;
      overflow: hidden;
      top: -19px !important;
      left: 0;
      width: 100%;
    }
    .v-messages__message {
      position: absolute;
      right: 0;
    }
  }
}
.v-application--is-rtl {
  .neosearchfield {
    .v-input__icon {
      margin: -5px !important;
    }
    .v-input__slot {
      font-size: $elise-font-size-3 !important;
      outline: none;
      outline-color: initial;
      outline-style: none;
      outline-width: inherit;
      box-sizing: border-box;

      min-height: 28px !important;
      border: 1px !important;
      // background-color: #fff;
      background-color: $color-blue-catskill-white;
    }
    .mdi-calendar::before {
      content: "\F00ED";
      margin-bottom: 20px !important;
      margin-left: -12px !important;
    }
    .v-input--is-disabled .v-input__slot {
      background-color: transparent !important;
      border: 1px solid !important;
      border-color: #e2e2e2 !important;

      input {
        color: black !important;
      }
    }
    .inputStyle {
      font-family: $elise-font-style;
      font-size: $content-font-size;
    }
    .labelstyle {
      color: $color-blue-blumine;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $content-font-size;
      margin-left: 10px;
    }
    .labelRequiredstyle {
      color: $color-red;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $content-font-size;
      margin-left: 10px;
    }
    .v-input__slot::after {
      border: 1px solid !important;
    }
    .input {
      border-radius: 1px !important;
    }
    .v-input__control {
      display: flex;
      flex-direction: column;
      height: auto;
      flex-grow: 1;
      flex-wrap: wrap;
      min-width: 0;
      height: 15px !important;
    }
    .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
      > .v-input__control
      > .v-input__slot
      fieldset {
      color: #f3f8f9 !important;
      border: 1px !important;
      height: 10px;
    }
    .v-text-field__details {
      display: flex;
      flex: 1 0 auto;
      max-width: 100%;
      min-height: 14 px;
      overflow: hidden;
      position: absolute;
      top: -19px !important;
      left: 0 !important;
    }
  }
}
</style>
