<template>
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :class="selectedOption === 'realisable' ? 'green' : 'blue'">
          {{ selectedOption === 'realisable' ? 'Réalisable' : 'À risque' }}
        </v-btn>
      </template>
  
      <v-list>
        <v-list-item v-for="option in remainingOptions" :key="option.value" @click="selectOption(option.value)">
          <v-list-item-title>{{ option.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedOption: 'realisable',
        options: [
          { label: 'Réalisable', value: 'realisable' },
          { label: 'À risque', value: 'risque' },
        ],
      };
    },
    computed: {
      remainingOptions() {
        return this.options.filter((option) => option.value !== this.selectedOption);
      },
    },
    methods: {
      selectOption(optionValue) {
        this.selectedOption = optionValue;
      },
    },
  };
  </script>
  
  <style>
  .green {
    background-color: green !important;
    color: white !important;
  }
  
  .blue {
    background-color: blue !important;
    color: white !important;
  }
  </style>
  