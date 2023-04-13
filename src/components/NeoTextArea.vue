<template>
  <div class="neotextarea">
    <label class="labelstyle"
      >{{ label }}
      <span
        v-show="isRequired"
        style="color:red ; margin-left: 10px; font-size:20px"
      >
        *</span
      ></label
    >
    <v-textarea
      slot="activator"
      class="inputStyle"
      v-bind="$attrs"
      v-on="$listeners"
      outlined
      dense
      :rules="rules"
    >
    </v-textarea>
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

#app {
  .neotextarea {
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

    .v-input--is-readonly .v-input__slot {
      background-color: #e4e4e4d2 !important;
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

    .v-input__control {
      display: flex;
      flex-direction: column;
      height: auto;
      flex-grow: 1;
      flex-wrap: wrap;
      min-width: 0;
    }
    .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
      > .v-input__control
      > .v-input__slot
      fieldset {
      color: #f3f8f9 !important;
      border: 1px !important;
      height: 6px;
    }
    .v-input--is-disabled .v-input__slot {
      background-color: transparent !important;
      border: 1px solid !important;
      border-color: #e2e2e2 !important;

      input {
        color: black !important;
      }
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
</style>
