<template>
  <div>
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :class="selectedOption === 'realisable' ? 'green darken-4' : 'primary'">
          {{ selectedOption === 'realisable' ? 'Réalisable' : 'À risque' }}
        </v-btn>
      </template>
  
      <v-list>
        <v-list-item v-for="option in remainingOptions" :key="option.value" @click="selectOption(option.value)">
          <v-list-item-title>{{ option.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-dialog v-model="dialogVisible" max-width="500px">
      <v-card>
        <v-card-title>
          {{ selectedOption === 'risque' ? 'Option à risque' : 'Autre option' }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="Champ 1" v-model="champ1"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="Champ 2" v-model="champ2"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" text @click="saveData">Enregistrer</v-btn>
          <v-btn color="grey" text @click="closeDialog">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </div>
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

      dialogVisible: false,
      champ1: '',
      champ2: '',
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
      if (optionValue === 'risque') {
        this.dialogVisible = true;
      }
    },
    closeDialog() {
      this.dialogVisible = false;
      // Réinitialisez les valeurs des champs si nécessaire
      this.champ1 = '';
      this.champ2 = '';
    },
    saveData() {
      // Effectuez ici votre logique pour enregistrer les valeurs
      console.log('Champ 1:', this.champ1);
      console.log('Champ 2:', this.champ2);
    },


    },
  };
  </script>
  
  <style>
  .green {
    background-color: "green darken-4" !important;
    color: white !important;
  }
  
  .blue {
    background-color: "primary" !important;
    color: white !important;
  }
  </style>
  