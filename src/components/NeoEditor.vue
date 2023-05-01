<template>
  <div class="neoeditor" id="neoeditor">
    <label class="labelstyle"
      >{{ label }}
      <span
        v-show="isRequired"
        style="color:red ; margin-left: 10px; font-size:20px"
      >
        *
      </span></label
    >
    <template>
      <ckeditor
        v-bind="$attrs"
        v-on="$listeners"
        :editor="editor"
        :config="editorConfig"
        @ready="Editor_onReady"
        :style="{ color: 'black', 'max-height': maxheight }"
      ></ckeditor>
    </template>
  </div>
</template>

<script>
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
export const uploader = function(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) =>
    new UploadAdapter(loader);
};
export class UploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }
  // Starts the upload process.
  upload() {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.addEventListener("load", () => {
        resolve({ default: reader.result });
      });
      reader.addEventListener("error", (err) => {
        reject(err);
      });
      reader.addEventListener("abort", () => {
        reject();
      });
      this.loader.file.then((file) => {
        if (file.size <= 100000) {
          reader.readAsDataURL(file);
        } else {
          reject(`File size exceeds the maximum of 100`);
        }
      });
    });
  }

  // Aborts the upload process.
  abort() {
    //
  }
}
export default {
  name: "NeoEditor",
  props: {
    label: {
      type: String,
    },

    isRequired: {
      type: Boolean,
      default: false,
    },
    maxheight: {
      type: String,
    },
  },
  data() {
    return {
      editor: DecoupledEditor,

      editorConfig: {
        extraPlugins: [uploader],
        language: "ar",

        toolbar: [
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "|",
          "outdent",
          "indent",
          "|",
          "bulletedList",
          "numberedList",

          "alignment",
          "undo",
          "redo",
        ],
      },
    };
  },
  methods: {
    Editor_onReady(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
  },
};
</script>

<style lang="scss">
.v-application--is-ltr {
  .ck.ck-toolbar {
    background: #f3f8f9;
  }
  .ck.ck-editor__editable_inline {
    border: 1px solid #c0c4cc;
  }
  .neotextfield {
    .v-input__slot {
      font-size: $elise-font-size-3 !important;
      outline: none;
      outline-color: initial;
      outline-style: none;
      outline-width: inherit;
      box-sizing: border-box;
      min-height: 28px !important;
      border: 1px !important;
      // background-color: #ffff;
      background-color: $color-blue-catskill-white;
    }

    .mdi-calendar::before {
      content: "\F00ED";
      margin-bottom: 20px !important;
      margin-left: -12px !important;
    }

    .v-input--is-disabled .v-input__slot {
      background-color: transparent !important;
      border: 1px solid !important;
      border-color: #e2e2e2 !important;

      input {
        color: black !important;
      }
    }
    .inputStyle {
      font-family: $elise-font-style;
      font-size: $content-font-size;
    }
    .labelstyle {
      color: $color-blue-blumine;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: 12px;
      margin-left: 10px;
    }
    .labelRequiredstyle {
      color: $color-red;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $content-font-size;
      margin-left: 10px;
    }

    .v-input__slot::after {
      border: 1px solid !important;
    }
    .input {
      border-radius: 1px !important;
    }
    .v-input__control {
      display: flex;
      flex-direction: column;
      height: auto;
      flex-grow: 1;
      flex-wrap: wrap;
      min-width: 0;
      height: 15px !important;
    }
    .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
      > .v-input__control
      > .v-input__slot
      fieldset {
      color: #f3f8f9 !important;
      border: 1px !important;
      height: 10px;
    }

    .v-text-field__details {
      position: absolute;
      display: flex;
      flex: 1 0 auto;
      max-width: 100%;
      min-height: 14 px;
      overflow: hidden;
      top: -19px !important;
      left: 0;
      width: 100%;
    }
    .v-messages__message {
      position: absolute;
      right: 0;
    }
  }
}
.v-application--is-rtl {
  .ck.ck-toolbar {
    background: #f3f8f9;
  }
  .ck.ck-editor__editable_inline {
    border: 1px solid #c0c4cc;
  }
  .neotextfield {
    .v-input__slot {
      font-size: $elise-font-size-3 !important;
      outline: none;
      outline-color: initial;
      outline-style: none;
      outline-width: inherit;
      box-sizing: border-box;
      min-height: 28px !important;
      border: 1px !important;
      // background-color: #fff;
      background-color: $color-blue-catskill-white;
    }

    .mdi-calendar::before {
      content: "\F00ED";
      margin-bottom: 20px !important;
      margin-left: -12px !important;
    }

    .v-input--is-disabled .v-input__slot {
      background-color: transparent !important;
      border: 1px solid !important;
      border-color: #e2e2e2 !important;

      input {
        color: black !important;
      }
    }
    .inputStyle {
      font-family: $elise-font-style;
      font-size: $content-font-size;
    }
    .labelstyle {
      color: $color-blue-blumine;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $content-font-size;
      margin-left: 10px;
    }
    .labelRequiredstyle {
      color: $color-red;
      min-width: 150px;
      align-items: center;
      display: flex;
      padding-bottom: 5px;
      font-family: $elise-font-style;
      font-size: $content-font-size;
      margin-left: 10px;
    }

    .v-input__slot::after {
      border: 1px solid !important;
    }
    .input {
      border-radius: 1px !important;
    }
    .v-input__control {
      display: flex;
      flex-direction: column;
      height: auto;
      flex-grow: 1;
      flex-wrap: wrap;
      min-width: 0;
      height: 15px !important;
    }
    .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
      > .v-input__control
      > .v-input__slot
      fieldset {
      color: #f3f8f9 !important;
      border: 1px !important;
      height: 10px;
    }

    .v-text-field__details {
      display: flex;
      flex: 1 0 auto;
      max-width: 100%;
      min-height: 14 px;
      overflow: hidden;
      position: absolute;
      top: -19px !important;
      left: 0 !important;
    }
  }
}
</style>
