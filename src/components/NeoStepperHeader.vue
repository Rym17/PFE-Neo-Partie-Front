<template>
  <div class="neostepperheader">
    <v-stepper-header>
      <v-col cols="12" sm="2">
        <v-btn
          icon
          color="#165c77"
          class="ButtonBackStyle"
          @click="stepBack()"
          v-if="step > 1"
        >
          <v-icon>navigate_before</v-icon>
        </v-btn>
      </v-col>

      <v-flex flex-direction: row>
        <template v-for="(item, i) in steps">
          <v-stepper-step
            :key="item.key"
            :complete="item > i"
            :step="i + 1"
            class="stepperFont"
          >
            {{ item.name }}
          </v-stepper-step>
          <v-divider :key="item.key" v-if="i != laststep - 1"></v-divider>
        </template>
      </v-flex>

      <v-col cols="12" sm="2">
        <v-btn
          icon
          color="#0b7b99"
          class="ButtonNextStyle"
          @click="stepNext()"
          v-if="step < laststep"
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
        <v-btn
          outlined
          fab
          color="#0b7b99"
          class="ButtonNextStyle"
          @click="stepNext()"
          v-if="step == laststep"
        >
          <v-icon>{{ icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-stepper-header>
  </div>
</template>
<script>
export default {
  name: "NeoStepperHeader",
  props: {
    _steps: {
      type: Array,
    },
    _step: {
      type: Number,
    },
    _icon: {
      type: String,
    },
    _laststep: {
      type: Number,
    },
  },
  computed: {
    steps: {
      get: function() {
        return this._steps;
      },
      set: function(_steps) {
        return _steps;
      },
    },
    step: {
      get: function() {
        return this._step;
      },
      set: function(_step) {
        return _step;
      },
    },
    icon: {
      get: function() {
        return this._icon;
      },
      set: function(_icon) {
        return _icon;
      },
    },
    laststep: {
      get: function() {
        return this._laststep;
      },
      set: function(_laststep) {
        return _laststep;
      },
    },
  },

  data: () => ({
    //psteps: this.steps,
    pstep: this.step.get(),
    picon: this.icon,
    plaststep: this.laststep,
  }),
  methods: {
    stepBack() {
      console.log(this.laststep);
      this.pstep = this.pstep - 1;
      this.picon = "navigate_next";
      if (this.pstep == this.plaststep) {
        this.picon = "done";
      }
    },
    stepNext() {
      this.pstep = this.pstep + 1;
      if (this.pstep == this.plaststep) {
        this.picon = "done";
      }
    },
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";

#app {
  .neostepperheader {
    .v-stepper {
      border-radius: 4px;
      overflow: hidden;
      position: inherit;
      box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 0%),
        0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 0px rgb(0 0 0 / 0%) !important;
    }
    .v-stepper__header {
      height: 72px;
      align-items: stretch;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      box-shadow: 0px 0px 0px 0px rgb(0 0 0 / 0%),
        0px 0px 0px 0px rgb(0 0 0 / 0%), 0px 0px 0px 0px rgb(0 0 0 / 0%) !important;
    }
    .buttonStyle {
      height: 30px !important;
      width: 30px !important;
      margin-top: 22px !important;
      margin-left: 3% !important;
      /*font-family: "Trebuchet MS", sans-serif !important;
  font-size: 16px;
  font-weight: bold;*/
    }
    .ButtonBackStyle {
      margin-left: 65% !important;
      margin-top: -2% !important;
    }
    .ButtonNextStyle {
      height: 40px !important;
      width: 40px !important;
      margin-left: 20% !important;
      margin-top: -3% !important ;
    }
    .stepperFont {
      font-family: $elise-font-style;
      font-size: 10px !important;
      color: $color-blue-medium !important;
    }
  }
}
</style>
