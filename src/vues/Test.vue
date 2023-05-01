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
                <v-btn icon class="mx-2" @click="editLabel(index)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="removeItem(index)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
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
                <v-card-text>
                  <template v-if="item.type === 'text' || item.type === 'number' || item.type === 'password'">
                    <v-text-field :label="item.label" :type="item.type" />
                  </template>
                  <template v-else-if="item.type === 'textarea'">
                    <v-textarea :label="item.label" />
                  </template>
                  <template v-else-if="item.type === 'select'">
                    <v-select :label="item.label" :items="item.options" />
                  </template>
                  <template v-else-if="item.type === 'checkbox'">
                    <v-checkbox :label="item.label" />
                  </template>
                  <template v-else-if="item.type === 'radio'">
                    <v-radio-group :label="item.label" :items="item.options" />
                  </template>
                  <template v-else-if="item.type === 'rating'">
                    <v-rating :label="item.label" :max="item.max" />
                  </template>
                </v-card-text>
              </v-card>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Edit Label</v-card-title>
        <v-card-text>
          <v-text-field v-model="newLabel" label="New Label"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="updateLabel">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
    data() {
        return {
            formItems: [
                { label: "Text Field", type: "text" ,icon: 'mdi-form-textbox' },
                { label: "Number Field", type: "number" , icon: 'mdi-number'},
                { label: "Password Field", type: "password" },
                { label: "Textarea", type: "textarea" , icon: 'mdi-form-textarea' },
                { label: "Select", type: "select", options: ["Option 1", "Option 2", "Option 3"] , icon: 'mdi-menu-down' },
                { label: "Checkbox", type: "checkbox" },
                { label: "Radio Buttons", type: "radio", options: ["Option 1", "Option 2", "Option 3"] ,icon: 'mdi-radiobox-marked' },
                { label: "Rating", type: "rating", max: 5 , icon: 'mdi-star'  },
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
const itemType = event.dataTransfer.getData("itemType");
const itemLabel = event.dataTransfer.getData("itemLabel");
this.droppedItems.push({ type: itemType, label: itemLabel });
},
removeItem(index) {
this.droppedItems.splice(index, 1);
},
editLabel(index) {
this.dialog = true;
this.editingIndex = index;
this.newLabel = this.droppedItems[index].label;
},
updateLabel() {
this.droppedItems[this.editingIndex].label = this.newLabel;
this.dialog = false;
},
},
};


</script>

<style>
.drag-list {
  height: calc(100vh - 64px);
  overflow-y: auto;
}
.drag-item {
  cursor: move;
}
.dropzone {
  border: 2px dashed grey;
  height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>