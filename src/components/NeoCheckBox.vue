<template>
  <div class="neocheckbox">
    <v-checkbox v-model="checked" v-bind="$attrs" v-on="$listeners">
    </v-checkbox>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,

  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>
<style lang="scss">
@import "../styles/variables.scss";

#app {
  .neocheckbox {
    .v-label {
      color: $color-blue-blumine;

      font-family: $elise-font-style;
      font-size: $elise-font-size-4;
    }
    .v-input .v-input__control {
      display: flex;
      flex-direction: column;
      height: auto;
      flex-grow: 1;
      flex-wrap: wrap;
      min-width: 0;
      height: 15px !important;
    }
    .v-text-field__details {
      display: flex;
      flex: 1 0 auto;
      max-width: 100%;
      min-height: 14 px;
      overflow: hidden;
      position: absolute;
      top: -19px !important;
      left: 47%;
    }
    .v-messages {
      left: 86%;
      flex: 1 1 auto;
      font-size: 12px;
      min-height: 14 px;
      min-width: 1 px;
      position: absolute;
    }
  }
}
</style>
