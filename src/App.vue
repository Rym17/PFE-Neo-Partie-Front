<template>
  <v-app>
    <!-- <div>
      <neo-bar> </neo-bar>
    </div>  -->

    <v-main style="background-color:#ffffff">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
//  import NeoBar from "../src/components/NeoBar.vue";
export default {
  name: "App",
  components: {
   //NeoBar,
  },
};
</script>
