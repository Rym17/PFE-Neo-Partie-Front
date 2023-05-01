<template>
  <div class="neoexpansionpanelheader">
    <v-expansion-panel-header
      style="
        font-family: Trebuchet MS, sans-serif !important;
        font-size: 12px !important;
        width: 98%;
      "
    >
      <v-divider class="mx-1" vertical></v-divider>
      <span class="labelstyle">{{ label }}</span></v-expansion-panel-header
    >
    <v-divider width="98%"></v-divider>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
    },
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

.v-application--is-ltr {
  .neoexpansionpanelheader {
    .v-expansion-panel-header {
      min-height: 48px !important;
      padding: 16px 0px !important;
    }
    .v-divider--vertical {
      border-width: 0px thin 0px 2px !important;
    }
    .labelstyle {
      color: $color-dimgrey;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $elise-font-size-2 !important;
      margin-left: 20px !important;
    }
  }
}
.v-application--is-rtl {
  .neoexpansionpanelheader {
    .v-expansion-panel-header {
      min-height: 48px !important;
      padding: 16px 0px !important;
    }
    .v-divider--vertical {
      border-width: 0px thin 0px 2px !important;
    }
    .labelstyle {
      color: $color-dimgrey;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: 16px !important;
      margin-right: 20px !important;
    }
  }
}
</style>
