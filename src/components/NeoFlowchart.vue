<template>
  <div class="neoflowchart">
    <label class="labelstyle"
      >{{ label
      }}<span
        v-show="isRequired"
        style="color:red ; margin-left: 10px; font-size:20px"
      >
        *</span
      ></label
    >
    <neo-text-field
      v-model="CHILDLABEL"
      @click="flowchart()"
      :prepend-inner-icon="
        `${selection === 'USER' ? 'person' : 'account_tree'}`
      "
      :rules="rules"
      clearable
      @click:clear="onClearClicked()"
      @keydown="keydown($event)"
    >
      ></neo-text-field
    >
    <div v-if="displayFlowchart">
      <neo-text-field
        v-model="search"
        label="."
        prepend-inner-icon="search"
      ></neo-text-field>
      <v-card flat height="200px" class="scroll" outlined>
        <v-treeview
          v-bind="$attrs"
          v-on="$listeners"
          v-model="treeview"
          hoverable
          :items="items"
          :search="search"
          :filter="filter"
          item-text="CHILD_LABEL"
          item-key="id"
          activatable
          @update:active="getActiveValue"
          return-object
          open-all
        >
          <template v-slot:prepend="{ item }">
            <v-icon
              v-if="item.children"
              v-text="
                `${item.CHILD_TYPE === 'SERVICE' ? 'account_tree' : 'person'}`
              "
            ></v-icon>
          </template>
          <template v-slot:label="{ item }">
            <span
              :style="
                item.CHILD_TYPE === 'SERVICE' && selection === 'USER'
                  ? 'color: darkgray;'
                  : ''
              "
            >
              {{ item.CHILD_LABEL }}
            </span>
          </template>
        </v-treeview>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    CHILDLABEL_Prop: {
      type: String,
    },
    rules: {
      type: Array,
      required: false,
    },
    label: {
      type: String,
    },
    items: {
      type: Array,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    selection: {
      type: String,
      default: "ALL",
    },
  },
  data: () => {
    return {
      displayFlowchart: false,
      open: [1, 2],
      search: null,
      CHILDLABEL_Data: "",
      selected: [],
      treeview: [],
    };
  },
  computed: {
    CHILDLABEL() {
      console.log(
        "neoflowchart | CHILDLABEL | CHILDLABEL_Prop : ",
        this.CHILDLABEL_Prop
      );
      console.log(
        "neoflowchart | CHILDLABEL | CHILDLABEL_Data : ",
        this.CHILDLABEL_Data
      );
      if (this.CHILDLABEL_Data != "") {
        return this.CHILDLABEL_Data;
      } else if (this.CHILDLABEL_Prop != "") {
        return this.CHILDLABEL_Prop;
      } else {
        return "";
      }
    },
    filter() {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined;
    },
    // treeview: {
    //   get: function() {
    //     return this.value;
    //   },
    //   set: function(newValue) {
    //     this.treeview = newValue;
    //     console.log("Setting new name: " + newValue);
    //   },
    // },
  },
  mounted() {
    console.log(
      "neoflowchart | mounted | CHILDLABEL_Prop : ",
      this.CHILDLABEL_Prop
    );
  },
  methods: {
    keydown(e) {
      if (!(e.key == "Enter" || e.key == "Tab")) e.preventDefault();
    },
    onClearClicked() {
      console.log("onClearClicked | ");
      // console.log("onClearClicked | value ", this.value);
      console.log("onClearClicked | treeview ", this.treeview);
      this.treeview = {
        EXTERNAL_ID: "FLOWCHART",
        parent_id: "LEXICON_00000000",
        PARENT_LABEL: "GED",
        PARENT_TYPE: "SERVICE",
        id: "VIDE",
        CHILD_LABEL: "",
        CHILD_TYPE: "USER",
        children: [],
      };
      this.$emit("input", this.treeview);
    },
    flowchart() {
      console.log(this.items);
      if (!this.displayFlowchart) {
        this.displayFlowchart = true;
        this.expanded = false;
      } else {
        this.displayFlowchart = false;
        this.expanded = true;
      }
    },
    getActiveValue(value) {
      this.treeview = value;
      console.log("NeoFlowChat | getActiveValue treeview : ", this.treeview);

      if (this.selection == "USER" && value[0].CHILD_TYPE == "USER")
        this.CHILDLABEL_Data = value[0].CHILD_LABEL;
      if (this.selection == "SERVICE" && value[0].CHILD_TYPE == "SERVICE")
        this.CHILDLABEL_Data = value[0].CHILD_LABEL;
      if (this.selection == "ALL") this.CHILDLABEL_Data = value[0].CHILD_LABEL;
      console.log("NeoFlowChat | getActiveValue value : ", value);
      this.$emit("input", value);
      this.displayFlowchart = false;
    },
  },
};
</script>
<style lang="scss">
@import "../styles/variables.scss";
.v-application--is-ltr {
  .neoselect {
    .v-input__slot {
      font-size: $elise-font-size-4;
      outline: none;
      outline-color: initial;
      outline-style: none;
      outline-width: inherit;
      box-sizing: border-box;
      min-height: 28px !important;
      border: 1px !important;
      background-color: $color-blue-catskill-white;
    }
    .mdi-calendar::before {
      content: "\F00ED";
      margin-bottom: 8px !important;
    }
    .v-input--is-readonly .v-input__slot {
      background-color: transparent;
    }
    .inputStyle {
      font-family: $elise-font-style;
      font-size: 14px;
    }
    .labelstyle {
      color: $color-blue-blumine;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: 14px;
      margin-left: 10px;
    }
    .labelRequiredstyle {
      color: $color-red;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: 14px;
      margin-left: 10px;
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
    .v-input__icon {
      align-items: center;
      display: inline-flex;
      height: 14px !important;
      flex: 1 0 auto;
      justify-content: center;
      min-width: 24px;
      width: 24px;
    }
  }
  .v-icon.v-icon {
    margin-top: -5px !important;
    margin-left: -5px !important;
  }
}
.v-application--is-rtl {
  .neoselect {
    .v-input__slot {
      font-size: $elise-font-size-4;
      outline: none;
      outline-color: initial;
      outline-style: none;
      outline-width: inherit;
      box-sizing: border-box;
      min-height: 28px !important;
      border: 1px !important;
      background-color: $color-blue-catskill-white;
    }
    .mdi-calendar::before {
      content: "\F00ED";
      margin-bottom: 8px !important;
    }
    .v-input--is-readonly .v-input__slot {
      background-color: transparent;
    }
    .inputStyle {
      font-family: $elise-font-style;
      font-size: 14px;
    }
    .labelstyle {
      color: $color-blue-blumine;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: 14px;
      margin-left: 10px;
    }
    .labelRequiredstyle {
      color: $color-red;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: 14px;
      margin-left: 10px;
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
    .v-input__icon {
      align-items: center;
      display: inline-flex;
      height: 14px !important;
      flex: 1 0 auto;
      justify-content: center;
      min-width: 24px;
      width: 24px;
    }
  }
}
</style>
