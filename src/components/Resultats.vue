<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>Formulaire final</v-card-title>
            
            <v-list-item v-for="(index) in droppedItems" :key="index" >

              <Formulaire :droppedItems="droppedItems"> </Formulaire>
              
            </v-list-item>
            <v-card-actions>
              <v-btn color="primary" @click="$router.go(-1)">Retour</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  

<script>
import Formulaire from "../components/Formulaire.vue";

export default {
    name: "Resultats",
    props: {
        droppedItems: {
            type: Array,
            default: () => []
        }
    },
    components: { Formulaire }
}



</script>