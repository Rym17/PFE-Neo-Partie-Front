<template>
  <div class="neodatepicker" id="neodatepicker">
    <v-menu
      class="neodatepicker--menu"
      v-model="menu1"
      :close-on-content-click="true"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
      nudge-bottom="27"
      :attach="att"
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
          v-bind="$attrs"
          v-model="computedDateFormatted"
          v-on:input="$emit('input', $event)"
          v-on="on"
          value
          background-color="#f3f8f9"
          outlined
          prepend-inner-icon="mdi-calendar"
        />
      </template>
      <v-date-picker
        class="neodatepicker--piker"
        v-model="selected"
        @input="menu1 = false"
        no-title
        :allowed-dates="alloweddates"
        :locale="locale"
      />
    </v-menu>
    <!-- end of date picker -->
  </div>
</template>

<script>
// :disabled-date="(selected) => selected >= new Date()"
import moment from "moment";
export default {
  name: "CustomDatePicker",
  props: {
    att: {
      type: Boolean,
      default: true,
    },
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

    alloweddates: {
      type: Function,
    },
    locale: {
      type: String,
      default: "fr-fr",
    },
    format: {
      type: String,
      default: "YYYY/MM/DD",
    },
  },
  data() {
    return {
      menu1: null,
      date: null,
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
    computedDateFormatted() {
      return this.formatDate(this.selected);
    },
  },

  watch: {
    date() {
      this.date = this.formatDate(this.date);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      return moment(date).format(this.format);
    },
  },
};
</script>

<style lang="scss">
.neodatepicker {
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

    .neodatepicker--piker .v-picker__body {
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

  .v-input__prepend-inner {
    margin-top: 20px !important;
    margin-right: -10px !important;
  }
}
.neodatepicker--menu {
  margin-left: 50% !important;
}
.v-application--is-rtl {
  .v-input__prepend-inner {
    margin-top: 15px !important;
    margin-left: 0px !important;
  }
}
.v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
  display: flex;
  flex: 1 1 auto;
  position: relative;
  margin-right: 10px;
}
</style>
