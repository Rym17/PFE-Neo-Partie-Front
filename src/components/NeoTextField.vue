<template>
  <div class="neotextfield">
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
      outlined
      dense
      :rules="rules"
    >
    </v-text-field>
  </div>
</template>

<script>
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
  },

  data: () => {
    return {};
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

.v-application--is-ltr {
  .neotextfield {
    .v-input__slot {
      font-size: $elise-font-size-3 !important;
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
  .neotextfield {
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
