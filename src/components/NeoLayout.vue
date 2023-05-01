<template>
  <v-app>
    <div>
      <neo-bar></neo-bar>
    </div>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NeoBar from "./NeoBar.vue";
export default {
  name: "NeoLayout",

  components: {
    NeoBar,
  },
  created() {},
  props: {
    source: String,
  },
  data: () => ({
    expandOnHover: false,
  }),
  computed: {},

  methods: {},
};
</script>
