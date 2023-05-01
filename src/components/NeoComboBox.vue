<template>
  <div class="neocombobox">
    <label class="labelstyle"
      >{{ label
      }}<span
        v-show="isRequired"
        style="color:red ; margin-left: 10px; font-size:20px"
      >
        *</span
      ></label
    >
    <v-combobox
      class="selectMenu"
      v-if="!autocomplete"
      v-bind="$attrs"
      v-on="$listeners"
      outlined
      dense
      background-color="#f3f8f9"
      :rules="rules"
    ></v-combobox>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
    },

    autocomplete: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      required: false,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

.v-application--is-ltr {
  .neocombobox {
    .v-chip {
      background: $color-blue-blumine !important;
      height: 22px !important;
      color: white;
    }
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

    .v-input--is-disabled .v-input__slot {
      background-color: transparent !important;
      border: 1px solid !important;
      border-color: #e2e2e2 !important;

      input {
        color: black !important;
      }
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
.v-application--is-rtl {
  .neocombobox {
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
