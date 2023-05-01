<template>
  <div class="neotimepicker" id="neotimepicker">
    <v-menu
      :attach="att"
      nudge-bottom="28"
      offset-y
      class="neotimepicker--menu"
      v-model="menu1"
      :close-on-content-click="true"
      transition="scale-transition"
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on }">
        <label class="labelstyle"
          >{{ label }}
          <span
            v-show="isRequired"
            style="color:red ; margin-left: 10px; font-size:20px"
          >
            *</span
          ></label
        >
        <neo-text-field
          id="fooAnchor"
          v-bind="attrs"
          v-on="on"
          v-model="selected"
          v-on:input="$emit('input', $event)"
          background-color="#f3f8f9"
          value
          prepend-inner-icon="mdi-clock-time-four-outline"
          outlined
          :disabled="disabled"
        />
      </template>
      <!-- <v-time-picker
        v-model="selected"
        @input="menu1 = false"
        locale="fr-fr"
      ></v-time-picker> -->

      <vuetify-time-select v-model="selected"></vuetify-time-select>
    </v-menu>
    <!-- end of date picker -->
  </div>
</template>

<script>
// :disabled-date="(selected) => selected >= new Date()"
import VuetifyTimeSelect from "vuetify-time-select";
import moment from "moment";
export default {
  components: { VuetifyTimeSelect },
  name: "CustomTimesPicker",
  props: {
    att: {
      type: Boolean,
      default: true,
    },
    disabled: { type: Boolean, default: false },
    menu: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: String,
      default: "fr-fr",
    },
  },
  data() {
    return {
      menu1: null,
      time: null,
    };
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
    computedTimeFormatted() {
      return this.formatDate(this.selected);
    },
  },

  watch: {
    date() {
      this.time = this.formatDate(this.time);
    },
  },
  methods: {
    formatDate(time) {
      if (!time) return null;

      return moment(time).format("HH:mm");
    },
  },
};
</script>

<style lang="scss">
.neotimepicker {
  position: relative;
  .mdi-calendar::before {
    content: "\F00ED";
    margin-bottom: 8px !important;
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
  .v-menu__content {
    // top: 313px !important;
    .v-picker--full-width {
      display: flex;
      width: 100%;
    }
    .neotimepicker--piker .v-picker__body {
      font-family: $elise-font-style;
      font-size: $elise-font-size-5 !important;
      // top: 110% !important;
      background-color: #f3f8f9 !important;
      width: 250px !important;
      height: 250px !important;
      border-radius: 5px !important;
      border: 1px solid $color-blue-dark !important;
    }
    margin-top: 0 !important;
    margin-left: 0 !important;
  }

  .v-input__icon {
    margin-top: -9px !important;
    margin-left: -6px !important;
  }
}
.neotimepicker--menu {
  margin-left: 50% !important;
}
</style>
