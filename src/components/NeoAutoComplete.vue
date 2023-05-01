<template>
  <div class="autocompletefield">
    <label class="labelstyle"
      >{{ label }}
      <span
        v-show="isRequired"
        style="color:red ; margin-left: 10px; font-size:20px"
      >
        *</span
      ></label
    >

    <v-autocomplete
      v-bind="$attrs"
      v-on="$listeners"
      outlined
      dense
      class="selectMenu"
      background-color="#f3f8f9"
      :rules="rules"
    ></v-autocomplete>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
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
  data: () => {
    return {};
  },
};
</script>
<style lang="scss">
.v-application--is-ltr {
  .autocompletefield {
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
      margin-bottom: 2px !important;
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
      min-height: 14px;
      overflow: hidden;
      position: absolute;
      top: -19px !important;
      left: 87%;
      width: 100%;
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
  .autocompletefield {
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
      margin-bottom: 2px !important;
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
