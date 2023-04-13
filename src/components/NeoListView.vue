<template>
  <div class="mt-4">
    <v-expansion-panels flat multiple>
      <v-expansion-panel v-for="item in objFinal.Data" :key="item.Panel">
        <neo-expansion-panel-header :label="item.Panel" />
        <v-expansion-panel-content>
          <v-row class="mt-4" v-for="form in item.Values" :key="form.Key">
            <v-col class="LineLabelStyle" cols="12" sm="3">
              {{ form.Key }}
            </v-col>
            <v-col class="LineLabelStyle" cols="12" sm="1"> : </v-col>
            <v-col class="LineValueStyle" cols="12" sm="3">
              {{ form.Value }}</v-col
            >
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import { bus } from "../main";
export default {
  name: "NeoListView",
  props: ["DataObject"],

  data: () => {
    return {
      Files: null,
      item: null,
      first: true,
      objFinalData: null,
    };
  },
  created() {
    bus.$on("SetFileList", (data) => {
      this.Files = data;
      console.log("EventBus Files = ", this.Files);
      console.log("EventBus Files length = ", this.Files.length);

      if (this.first == true) {
        console.log("first == true");
        (this.item = {
          Panel: "Liste des fichiers",
          Values: [
            {
              Key: this.Files[this.Files.length - 1].categorie,
              Value: this.Files[this.Files.length - 1].Fichier,
            },
          ],
        }),
          this.obj.Data.push(this.item);
        this.objFinalData = this.obj;
        console.log(" objFinalData = ", this.objFinalData);
        this.first = false;
        console.log("first after Update = ", this.first);
        this.item = null;
        console.log("clear this.item =  ", this.item);
      } else if (this.first == false) {
        console.log("first == false");

        (this.item = {
          Key: this.Files[this.Files.length - 1].categorie,
          Value: this.Files[this.Files.length - 1].Fichier,
        }),
          console.log("this.item :", this.item);

        this.obj.Data[this.obj.Data.length - 1].Values.push(this.item);

        console.log(" obj = ", this.obj);
        this.item = null;
        console.log("clear this.item =  ", this.item);
        this.objFinalData = this.obj;
        console.log(" objFinalData = ", this.objFinalData);
      }
    });
  },

  computed: {
    objFinal() {
      console.log("objFinal ==== ", this.objFinalData);
      return this.objFinalData;
    },
    obj() {
      console.log("DataObject ==== ", this.DataObject);
      return this.DataObject;
    },
  },
};
</script>
<style>
@import "../styles/NeoLayout.scss";
</style>
