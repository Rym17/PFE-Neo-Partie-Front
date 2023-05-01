<template>
    <v-container fluid>
      <v-row>
        <v-col cols="3">
          <v-card class="drag-list" height="100%">
            <v-card-title>
              Form Items
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(item, index) in formItems" :key="index" class="drag-item" draggable @dragstart="dragStart(index)">
                  {{ item.label }}

                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-card class="dropzone" @dragover.prevent @drop="drop($event)" :style="{ width: dropzoneWidth + 'px' }" height="100%">
            <v-card-title>
              Drop zone
            </v-card-title>
            <v-card-text>
              <v-form ref="form">
                <v-card v-for="(item, index) in droppedItems" :key="index">
                  <v-card-title>
                     {{ item.label }}
                  </v-card-title>
                 
                   
                    <v-btn-group class="form__actionlist">

                    <v-btn icon @click="editLabel(item)">
                    <v-icon>mdi-pencil</v-icon>
                   </v-btn>
                    <v-btn icon @click="removeItem(index)">
                    <v-icon>mdi-delete</v-icon>
                    </v-btn>
                   
                    </v-btn-group>
                   
                  
                    <template v-if="item.type === 'text' || item.type === 'number' || item.type === 'password'">
                      <NeoTextField :type="item.type" />
                    </template>
                    <template v-else-if="item.type === 'textarea'">
                      <NeoTextArea />
                    </template>
                    <template v-else-if="item.type === 'select'">
                      <NeoSelect :items="item.options" />
                    </template>
                    <template v-else-if="item.type === 'checkbox'">
                      <NeoCheckBox  />
                    </template>
                    <template v-else-if="item.type === 'radio'">
                      <NeoRadio  :items="item.options" />
                    </template>
                    <template v-else-if="item.type === 'rating'">
                      <v-rating :max="item.max" />
                    </template>
                 
                </v-card>
              </v-form>
            </v-card-text>
            <v-card-actions>
                    <v-btn color="primary" @click="goToFormFinal">Voir le formulaire final</v-btn>
                  </v-card-actions>
          </v-card>
          
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
import NeoCheckBox from '../components/NeoCheckBox.vue';
import NeoRadio from '../components/NeoRadio.vue';
import NeoSelect from '../components/NeoSelect.vue';
import NeoTextArea from '../components/NeoTextArea.vue';
import NeoTextField from '../components/NeoTextField.vue';

  export default {
    name:'Dragtest.vue',
    data() {
        return {
            formItems: [
                { label: "Text Field", type: "text" },
                { label: "Number Field", type: "number" },
                { label: "Password Field", type: "password" },
                { label: "Textarea", type: "textarea" },
                { label: "Select", type: "select", options: ["Option 1", "Option 2", "Option 3"], icon: "mdi-menu-down" },
                { label: "Checkbox", type: "checkbox" },
                { label: "Radio Buttons", type: "radio", options: ["Option 1", "Option 2", "Option 3"], icon: "mdi-radiobox-marked" },
                { label: "Rating", type: "rating", max: 5, icon: "mdi-star" },
            ],
            draggedItemIndex: null,
            droppedItems: [],
            dropzoneWidth: "cover",
        };
    },
    methods: {
        dragStart(index) {
            this.draggedItemIndex = index;
        },
        drop(event) {
            event.preventDefault();
            const droppedItem = this.formItems[this.draggedItemIndex];
            const copiedItem = Object.assign({}, droppedItem); // Create a copy of the dropped item
            this.droppedItems.push(copiedItem); // Add the copied item to the dropped items array
        },
        removeItem(index) {
            this.droppedItems.splice(index, 1);
        },
        editLabel(item) {
            const newLabel = prompt("Enter new label", item.label);
            if (newLabel !== null && newLabel.trim() !== "") {
                item.label = newLabel.trim();
            }
        },
        goToFormFinal() {
      // Naviguer vers la page de formulaire final en utilisant Vue Router
      this.$router.push({ name: 'Previewform', props: { droppedItems: this.droppedItems }});
    }
       
       
       
    },
    components: { NeoTextField, NeoTextArea, NeoSelect, NeoCheckBox, NeoRadio }
};
  </script>
  
  <style>
  .drag-list {
    padding: 16px;
  }
 
  
  .dropzone {
    padding: 16px;
    
  }
  .form__actionlist {
    position: absolute;
    margin-top: 10px;
    visibility: visible;
    z-index: 3;
    right: 0;
    border-radius: 2px;
}


  </style>