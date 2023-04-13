<template>
  <div class="SIGNATURE_PDF_PART" id="SIGNATURE_PDF_PART" style="z-index: -1">
    <div id="ApercuProgress" class="ApercuProgress">
      <v-progress-circular
        indeterminate
        :size="200"
        :width="15"
        color="#F6C900"
      ></v-progress-circular>
    </div>
    <div
      @mouseenter="showPdfJsActionButtons()"
      @mousemove="showPdfJsActionButtons()"
      @wheel="showPdfJsActionButtons()"
      @mouseleave="hidePdfJsActionButtons()"
    >
      <v-app-bar style="width:100%" flat color="#103c4c" height="30">
        <v-img src="file.png" max-height="20" max-width="20"></v-img>
        <span
          class="ml-2"
          style="font-family: Trebuchet MS, sans-serif; color:white; font-size:12px"
          >FICHIER ( {{ index }}/{{ attachmentsLength }} )</span
        >
        <!-- {{ attachmentsLength }} -->
      </v-app-bar>

      <v-flex class="zoomStyle not-visible">
        <v-flex style="">
          <v-btn
            :disabled="ATTACHisEMPTY"
            color="white"
            icon
            @click="ApercuBefore()"
          >
            <v-icon>navigate_before</v-icon></v-btn
          >
        </v-flex>
        <v-flex style="position:absolute; left:5%; top:9%">
          <span class="fileNameStyle">
            {{ fileName }}
          </span></v-flex
        >

        <v-flex style="position: absolute; right:0">
          <v-btn
            :disabled="ATTACHisEMPTY"
            color="white"
            icon
            @click="ApercuNext()"
          >
            <v-icon>navigate_next</v-icon></v-btn
          ></v-flex
        >
      </v-flex>
      <div
        class="viewer-pagination"
        :class="showPdfJsButtons ? 'is-visible' : 'not-visible'"
      >
        <div class="viewer-pagination-block">
          <div class="viewer-pagination-data">
            <div class="action-button-block">
              <v-icon small color="white" @click="pageDown()"
                >expand_more</v-icon
              >
            </div>
            <div class="action-button-block">
              <v-icon small color="white" @click="pageUp()">expand_less</v-icon>
            </div>
            <div class="action-button-block">
              {{ `${pageNo}/${totals.length}` }}
            </div>
          </div>
        </div>
      </div>
      <div id="showPdf">
        <el-scrollbar
          ref="elscrollbar"
          id="elscrollbar"
          style="height: 100vh !important;  overflow: hidden !important;  overflow-y: hidden !important; scrollbar-width: none; -ms-overflow-style: none;  "
        >
          <v-flex id="viewer" class="PDF_VIEWER">
            <div class="main_content" id="mainContent" ref="mainContent">
              <div
                v-for="item in totals"
                :id="`page-${item}`"
                :key="item"
                class="pdf-box"
              >
                <canvas :id="'canvas-pdf-' + item" class="canvas-pdf"></canvas>
              </div>
            </div>
          </v-flex>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import $ from "jquery";
import axios from "axios";
import PDFJS from "pdfjs-dist";
import { TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";
export default {
  props: {
    attachments: {
      type: Array,
    },
  },

  data: () => {
    return {
      config: Vue.prototype.$config,
      fileName: "",
      hidePdfJsButtonsTimeout: undefined,
      hideButtonsDelay: 5000,
      showPdfJsButtons: false,
      scale: 1.2,
      totals: [],
      pageNo: 1,
      viewHeight: 0,
      scrollbar: "",
      index: 0,
      attachmentsLength: 0,
      ATTACHisEMPTY: false,
    };
  },
  methods: {
    showConsole() {
      console.log("hiiiii");
    },
    showPdfJsActionButtons() {
      this.togglePdfJsButtons(true);
      if (this.hidePdfJsButtonsTimeout) {
        clearTimeout(this.hidePdfJsButtonsTimeout);
      }
      this.hidePdfJsButtonsTimeout = setTimeout(() => {
        this.hidePdfJsActionButtons();
      }, this.hideButtonsDelay);
    },
    hidePdfJsActionButtons() {
      this.togglePdfJsButtons(false);
    },
    togglePdfJsButtons(value) {
      if (value !== this.showPdfJsButtons) {
        this.showPdfJsButtons = value;
        if (!this.showPdfJsButtons) {
          console.log(!this.showPdfJsButtons);
        }
      }
    },
    renderPdf(pdfUrl) {
      this.scrollbar = this.$refs["elscrollbar"].$refs["wrap"];
      this.scrollbar.addEventListener("scroll", this.scrollfun, false);
      this.getMainContentWidth();

      PDFJS.workerSrc = require("pdfjs-dist/build/pdf.worker.min");
      let res = atob(pdfUrl);
      PDFJS.getDocument({ data: res }).then((pdf) => {
        let totalPage = pdf.numPages;
        let idName = "canvas-pdf-";
        this.createCanvas(totalPage, idName);
        for (let i = 1; i <= totalPage; i++) {
          pdf.getPage(i).then((page) => {
            let pageDiv = document.getElementById(`page-${i}`);
            // let viewport = page.getViewport(scale)
            let viewportFirst = page.getViewport(1);
            // Calculate the scale value, this.contentWidth is the width of the element of ref = mainContent
            let scale = this.contentWidth / viewportFirst.width;
            let viewport = page.getViewport(scale);
            let canvas = document.getElementById(idName + i);
            let context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            this.viewHeight = viewport.height;
            let renderContext = {
              canvasContext: context,
              viewport,
            };
            page
              .render(renderContext)
              .then(() => {
                return page.getTextContent();
              })
              .then((textContent) => {
                // Create a text layer div
                const textLayerDiv = document.createElement("div");
                textLayerDiv.setAttribute("class", "textLayer");
                // Add a text layer div to the div of each page pdf
                pageDiv.appendChild(textLayerDiv);
                // Create a new TextLayerBuilder instance
                let textLayer = new TextLayerBuilder({
                  textLayerDiv: textLayerDiv,
                  pageIndex: page.pageIndex,
                  viewport: viewport,
                });
                textLayer.setTextContent(textContent);
                textLayer.render();
                console.log("pdf successfully rendred");
                $("#ApercuProgress").hide(0);
              });
          });
        }
      });
    },
    createCanvas(totalPages) {
      this.totals = [];
      for (let i = 1; i <= totalPages; i++) {
        this.totals.push(i);
      }
    },
    scrollfun(e) {
      let scrollTop = e.target.scrollTop;
      if (scrollTop === 0) {
        this.pageNo = 1;
      } else {
        this.pageNo = Math.ceil((scrollTop + 15) / this.viewHeight);
      }
    },
    pageUp() {
      let totalPages = this.totals.length;
      if (this.pageNo > 0) {
        this.scrollbar.scrollTop =
          (this.pageNo - 2) * (this.scrollbar.scrollHeight / totalPages);
      }
    },
    pageDown() {
      let totalPages = this.totals.length;
      if (this.pageNo < totalPages) {
        this.scrollbar.scrollTop =
          this.pageNo * (this.scrollbar.scrollHeight / totalPages);
      }
    },
    getMainContentWidth() {
      let div = this.$refs.mainContent;
      let width = window.getComputedStyle(div).width;
      this.contentWidth = parseInt(width);
    },
    ApercuBefore() {
      if (this.index == 1) {
        this.index = this.attachments.length;
      } else {
        this.index = this.index - 1;
      }
      this.ApercuPDF(
        this.attachments[this.index - 1].Attch_ID,
        this.attachments[this.index - 1].Name,
        this.attachments[this.index - 1].HasPdf,
        this.attachments[this.index - 1].notPdfFile
      );
      console.log("ApercuNext => ", this.index);
    },
    ApercuNext() {
      if (this.index == this.attachments.length) {
        this.index = 1;
      } else {
        this.index = this.index + 1;
      }
      this.ApercuPDF(
        this.attachments[this.index - 1].Attch_ID,
        this.attachments[this.index - 1].Name,
        this.attachments[this.index - 1].HasPdf,
        this.attachments[this.index - 1].notPdfFile
      );
      console.log("ApercuBefore => ", this.index);
    },
    ApercuPDF(IDAttach, Name, HasPdf, notPdfFile) {
      let self = this;
      let USERLOGIN = this.$route.query.USERLOGIN;
      console.log("*********begin ApercuPDF********* ");
      console.log(" mounted attachments", this.attachments[0].Attch_ID);
      $("#ApercuProgress").show(0);
      //   var AttachExtension = Name.split(".")[1];
      //   console.log("METHOD : ApercuPDF : Extesion : ", AttachExtension);
      const mapUrl = Vue.prototype.$glbConfig.GLB_API_URL;
      axios({
        url: mapUrl + "GetStreamattachments",
        params: {
          docID: IDAttach,
          HasPdf: HasPdf,
          notPdfFile: notPdfFile,
          USERLOGIN: USERLOGIN,
        },
        method: "GET",
      })
        .then((response) => {
          $("#ApercuProgress").hide(0);
          var result = response.data;
          self.fileBase64 = response.data;
          self.fileName = Name;

          self.renderPdf(self.fileBase64);
          console.log("fileName : " + self.fileName);
          console.log("METHOD : ApercuPDF : SUCCESS : ", result);
        })
        .catch((error) => {
          console.log("METHOD : ApercuPDF : ERROR : ", error);
          $("#ApercuProgress").hide(0);
        });
    },
  },

  async mounted() {
    console.log("NeoPdfViewer | mounted | attachments", this.attachments);

    $("#ApercuProgress").show(0);

    setTimeout(() => {
      if (this.attachments != null || this.attachments != undefined) {
        if (this.attachments.length > 0) {
          console.log(
            "NeoPdfViewer | mounted | attachments > 0",

            this.attachments
          );

          console.log("aaa : ", this.attachments.length);

          this.attachmentsLength = this.attachments.length;

          this.index = 1;

          this.ApercuPDF(
            this.attachments[this.index - 1].Attch_ID,

            this.attachments[this.index - 1].Name,

            this.attachments[this.index - 1].HasPdf,

            this.attachments[this.index - 1].notPdfFile
          );

          this.ATTACHisEMPTY = false;
        } else {
          console.log("NeoPdfViewer | mounted | 1111");

          console.log(this.attachments.length);

          this.index = 0;

          this.attachmentsLength = 0;

          this.ATTACHisEMPTY = true;

          $("#ApercuProgress").hide(0);
        }
      } else {
        console.log("NeoPdfViewer | mounted | 2222");

        this.index = 0;

        this.attachmentsLength = 0;

        this.ATTACHisEMPTY = true;

        $("#ApercuProgress").hide(0);
      }
    }, 5000);
  },
};
</script>

<style lang="scss">
@import "../styles/variables.scss";
$viewer-pagination-width: 120px;
$bottom-zoom-spacing-height: 23px;
$bottom-pagination-spacing-height: 75px;
$side-actions-spacing-width: 35px;
$side-zoom-spacing-width: 27px;
$file-action-button-size: 42px;
.zoomStyle {
  display: flex;
  height: 40px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 30px;
  z-index: 9999;
}
.viewer-pagination {
  position: absolute;
  bottom: $bottom-pagination-spacing-height;
  z-index: 999;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  left: 50%;
  transform: translate(-50%, -50%);
  // background-color: rgba(0, 0, 0, 0.4);
  &.is-visible {
    .viewer-pagination-block {
      visibility: visible !important;
      opacity: 1;
      transition: opacity 0.5s linear;
    }
  }

  &.not-visible {
    .viewer-pagination-block {
      opacity: 0;
      transition: visibility 0s 0.5s, opacity 0.5s linear;
    }
  }

  .viewer-pagination-block {
    visibility: hidden;
    display: flex;
    flex-direction: row;
    background-color: $color-dark-opacity-70;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    .viewer-pagination-data {
      height: 40px;
      width: 350px;
      min-width: 350px;
      color: $color-white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;

      .pageNumber {
        color: $color-grey-tundora;
        font-weight: bold;
        text-align: center;
        width: 30px !important;
        max-width: 30px !important;
        border-radius: 4px;
      }

      .separator,
      .numPages {
        height: 100%;
      }

      .pageNumber,
      .separator,
      .numPages {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .pageNumber,
      .numPages {
        margin: 0 10px;
        padding: 0;
      }

      .numPages {
        white-space: nowrap;
        width: 30px;
      }

      .valueZoom {
        color: $color-blue-jungle-mist;
        display: inline-block;
        width: 35px;
        max-width: 35px;
      }
    }

    .action-button-block {
      margin: 0 10px;

      .action-button {
        flex: 1;
        background-color: transparent;
        margin: 0;
        font-size: 20px;
        padding: 0;
        text-shadow: 1px 1px 1px $color-dark-opacity-70;

        &:hover {
          .elise-icon-chevron,
          .elise-icon-add,
          .elise-icon-remove,
          .elise-icon-rotate-right {
            &:before {
              color: $color-white;
            }
          }
        }

        .elise-icon-chevron,
        .elise-icon-add,
        .elise-icon-remove,
        .elise-icon-rotate-right {
          &:before {
            color: $color-blue-jungle-mist;
          }
        }
      }
    }
  }
}
.SIGNATURE_PDF_PART {
  position: absolute;
  background-color: #201c2c;
  right: 0;
  width: 100%;
  height: 100%;
  border-right: 5px solid rgb(16, 60, 76);
}
.fileNameStyle:hover {
  text-decoration: underline;
}
.fileNameStyle {
  margin: 10px;
  color: #ffffff;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Trebuchet MS, sans-serif;
  font-size: 12px;
}
.ApercuProgress {
  margin-right: 20% !important;

  margin-top: 20%;
  z-index: 100;
  position: fixed;
}
.PDF_CONTAINER {
  margin: auto;
}
.PDF_CONTAINER.page {
  display: inline-block;
}
.PDF_VIEWER.page {
  display: inline-block;
}
#showPdf {
  .position {
    position: absolute;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 100;
    padding: 3px 15px;
    line-height: 25px;
    color: #fff;
    overflow: hidden !important;
    .span_1 {
      float: left;
    }
    .span_3 {
      margin-left: 29%;
    }
    .span_2 {
      float: right;
    }
  }
  .page {
    top: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .span_1 {
      cursor: pointer;
    }
    .span_2 {
      cursor: pointer;
    }
  }
  .pdf-box {
    position: relative;
    text-align: left;
    display: inline-block;
  }
  .canvas-pdf {
    display: inline-block;
    width: 100%;
  }
}
#elscrollbar {
  display: inline-block;
  width: 100%;
  align-self: center;
  overflow: -moz-hidden-unscrollable;
  overflow: hidden !important;
}
#viewer {
  display: inline-block;
  width: 100%;
}
</style>
