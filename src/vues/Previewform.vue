<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Formulaire final</v-card-title>
            <v-card-text>
              <!-- Afficher le composant de formulaire ici -->
              <Dragtest  :droppedItems="droppedItems" />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="$router.go(-1)">Retour</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  

<script>
import Dragtest from './Dragtest.vue';
export default {
  name: 'Previewform',
  components: {
    Dragtest
  },
  props: {
    droppedItems: {
      type: Array,
      default: () => []
    }
  }
}






</script>