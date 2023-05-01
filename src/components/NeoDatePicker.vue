<template>
  <div class="neodatepicker" id="neodatepicker">
    <label class="labelstyle"
      >{{ label }}
      <span
        v-show="isRequired"
        style="color:red ; margin-left: 10px; margin-right: 10px"
      >
        *
      </span>
    </label>
    <v-menu
      class="neodatepicker--menu"
      v-model="menu1"
      :close-on-content-click="false"
      transition="scale-transition"
      :attach="att"
      offset-y
      nudge-bottom="27"
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on }">
        <neo-text-field
          v-bind="$attrs"
          v-model="computedDateFormatted"
          v-on:input="$emit('input', $event)"
          v-on="on"
          value
          background-color="#f3f8f9"
          outlined
          prepend-inner-icon="mdi-calendar"
          readonly
        />
      </template>
      <v-date-picker
        prev-icon="mdi-triangle-small-up mdi-rotate-270"
        next-icon="mdi-triangle-small-up mdi-rotate-90"
        :weekday-format="getDay"
        class="neodatepicker--piker"
        v-model="selected"
        @input="menu1 = false"
        no-title
        :allowed-dates="alloweddates"
        locale="ar-TN"
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
    menu: {
      type: Boolean,
      default: false,
    },
    att: {
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
      default: "DD/MM/YYYY",
    },
  },
  data() {
    return {
      labelShow: false,
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
    getDay(date) {
      const daysOfWeek = [
        "إثنين",
        "ثلاثاء",
        "أربعاء",
        "خميس",
        "جمعة",
        "سبت",
        "أحد",
      ];
      let i = new Date(date).getDay(date);
      return daysOfWeek[i];
    },
    formatDate(date) {
      if (!date) return null;
      moment.locale("ar-TN");
      return moment(date).format("LL");
    },
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

.neodatepicker {
  position: relative;
  .mdi-calendar::before {
    content: "\F00ED";
    margin-bottom: 8px !important;
  }
  .v-date-picker-table--month td {
    height: 10px;
  }
  .v-date-picker-table {
    padding: 0px;
  }
  .v-btn--rounded {
    border-radius: 0px;
  }
  // .v-btn {
  //   border-radius: 0px;
  // }
  .v-btn:not(.v-btn--round).v-size--default {
    height: 30px;
    font-size: 11px;
    padding: 0 0px;
  }
  .mdi-triangle-small-up::before {
    font-size: 40px;
    color: black;
    margin-left: 0px;
  }
  .v-date-picker-header {
    padding-left: 0px;
    padding-right: 0px;
  }
  .v-date-picker-table {
    height: auto !important;
  }
  .theme--light.v-date-picker-table th,
  .theme--light.v-date-picker-table--date__week {
    color: black;
    font-size: 9px;
  }
  .v-date-picker-table--date th {
    font-weight: 5;
  }
  .v-date-picker-header__value button {
    font-weight: normal;
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
      font-family: $elise-arabic-font-style;
      font-size: $elise-font-size-5 !important;
      // top: 110% !important;
      background-color: #f3f8f9 !important;
      width: 250px !important;
      height: auto !important;
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
  margin-top: 0px;
  margin-left: 50% !important;
}
.v-input__prepend-inner {
  margin-top: 15px !important;
  margin-left: 0px !important;
}
.v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
  display: flex;
  font-family: $elise-arabic-font-style;
  font-size: 14px;
  flex: 1 1 auto;
  position: relative;
  margin-right: 10px;
}
</style>
