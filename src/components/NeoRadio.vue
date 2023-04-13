<template>
  <div class="neoradiogroup">
    <v-radio
      v-model="selected"
      :label="label"
      v-on:input="$emit('input', $event)"
    ></v-radio>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
    },
    label: {
      type: String,
    },
    value: {
      type: String,
      default: "",
    },
  },

  computed: {
    selected: {
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
  .neoradiogroup {
    .v-label {
      color: $color-blue-blumine;

      font-family: $elise-font-style;
      font-size: $elise-font-size-3;
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
  }
}
</style>
