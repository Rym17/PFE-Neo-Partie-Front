<template>
  <div>
  
    <v-container fluid  style="background-color: white;">
      
      <br> <br>
      <v-row>
        <v-col cols="6" >
          <NeoTextField v-model="searchText" label="Rechercher" outlined placeholder="Rechercher...." :append-icon="searchIcon"></NeoTextField>
        </v-col>
      
        <v-col cols="8"></v-col>
        <v-col cols="4" class="text-right">

        <v-btn 
        color="primary"
        dark
        text
      >
        <v-icon dark>
          mdi-import
        </v-icon>
       importer
      </v-btn>  

      <v-btn
        text
        color="primary"
        dark
      >
        <v-icon dark>
          mdi-export-variant
        </v-icon>
       Exporter 
       
      </v-btn>  
    </v-col>
      </v-row>

      </v-container>
   
   







    
  <v-data-table
    :headers="headers"
    :items="filteredUsers"
    sort-by="calories"
    class="elevation-1"
   
  >
  
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Mes collaborateurs</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider> 
        <v-spacer></v-spacer>
        <NouvCollab/>
       
        <v-dialog
          v-model="dialog"
          max-width="650px"
        >
         <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>-->
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  <neo-text-field label="Nom" v-model="NOM">
                  </neo-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  <neo-text-field label="Prénom" v-model="PRENOM">
                  </neo-text-field>
                  </v-col>
                 </v-row>
                  <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                   <neo-date-picker label="Date de naissance" v-model="DATE"> 
                   </neo-date-picker>    
                  </v-col>
                 
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  > 
                  <neo-text-field label="Téléphone" v-model="PHONE">
                  </neo-text-field>
                  </v-col>
                 
                  </v-row>
                  <v-row>
                  <v-col
                    cols="12"
                    sm="10"
                    md="4"
                  >
                  <neo-text-field label="E-mail Personnel" v-model="MAILPERSO">
                  </neo-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="10"
                    md="4"
                  >
                  <neo-text-field label="E-mail Profesionnel" v-model="MAILPRO">
                   </neo-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <neo-text-field label="Manager" v-model="MANAGER">
                  </neo-text-field>
                  </v-col>
                </v-row>
                  <v-row>
                  
                  
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  <neo-select 
           label="Département" 
           v-model="DEPARTEMENT"
           return-object
           :items="DEPARTEMENT_ITEMS"
           item-text="VALEUR"
           item-value="ID" >
           </neo-select>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="6"
                  >
                  <neo-select label="Role principal" 
         v-model="ROLEPRINC" 
         return-object
         :items="ROLEPRINC_ITEMS"
         item-text="VALEUR"
         item-value="ID" >
           </neo-select>
                  </v-col>



                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="save"
              >
                Enregistrer
              </v-btn>
              <v-btn
                color="grey"
                text
                @click="close"
              >
                Annuler
              </v-btn>
              
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title style="font-size: medium;">Êtes-vous sûr de bien vouloir supprimer cet élément?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="deleteItemConfirm">OK</v-btn>
              <v-btn color="grey" text @click="closeDelete">Annuler</v-btn>
              
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        medium-icon
        class="mr-2"
        color="#165c77"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        medium-icon
        color="orange darken-4"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    
  </v-data-table>
</div>
</template>
<script>
import NeoTextField from './NeoTextField.vue';





export default {
    data: () => ({
        searchText: "",
        dialog: false,
        dialogDelete: false,
        searchIcon: "mdi-magnify",
        headers: [
            {
                text: "Nom",
                align: "start",
                sortable: false,
                value: "nom",
            },
            { text: "Prénom", value: "prénom" },
            { text: "Email professional", value: "mailprofessionnel" },
            { text: "Manager", value: "manager" },
            { text: "Département", value: "département" },
            { text: "Role principal", value: "roleprincipal" },
            { text: "Actions", value: "actions", sortable: false },
        ],
        users: [
            {
                nom: "Charni",
                prénom: "Rym",
                naissance: "111111",
                téléphone: "222222",
                mailpersonnel: "ddddddd",
                mailprofessionnel: "dddddddddd",
                manager: "dddddddddd",
                département: "dddddddddd",
                roleprincipal: "ddddd",
            },
            {
                nom: "aaaa",
                prénom: "aaaaaaa",
                naissance: "aaaaaaaaaaaa",
                téléphone: "aaaaaa",
                mailpersonnel: "aaaaaaaa",
                mailprofessionnel: "aaaaaaa",
                manager: "aaaaaaaa",
                département: "aaaaaaa",
                roleprincipal: "aaaaaaaaaaa",
            },
            {
                nom: "zzz",
                prénom: "zzz",
                naissance: "zzzzzz",
                téléphone: "zzzzz",
                mailpersonnel: "zzzzzz",
                mailprofessionnel: "zzzzzzzz",
                manager: "zzzzzzzz",
                département: "zzzzzzz",
                roleprincipal: "zzzzzz",
            },
            {
                nom: "aaaa",
                prénom: "aaaaaaa",
                naissance: "aaaaaaaaaaaa",
                téléphone: "aaaaaa",
                mailpersonnel: "aaaaaaaa",
                mailprofessionnel: "aaaaaaa",
                manager: "aaaaaaaa",
                département: "aaaaaaa",
                roleprincipal: "aaaaaaaaaaa",
            },
            {
                nom: "bbbbbbbb",
                prénom: "bbbbbbb",
                naissance: "bbbbbbbb",
                téléphone: "bbbbbbbbbb",
                mailpersonnel: "bbbbbbbb",
                mailprofessionnel: "bbbbbbbbb",
                manager: "bbbbbbbbb",
                département: "bbbbbbbb",
                roleprincipal: "bbbbbbb",
            },
            {
                nom: "aaaa",
                prénom: "aaaaaaa",
                naissance: "aaaaaaaaaaaa",
                téléphone: "aaaaaa",
                mailpersonnel: "aaaaaaaa",
                mailprofessionnel: "aaaaaaa",
                manager: "aaaaaaaa",
                département: "aaaaaaa",
                roleprincipal: "aaaaaaaaaaa",
            },
            {
                nom: "rrrrrrrr",
                prénom: "rrrrrrr",
                naissance: "rrrrrr",
                téléphone: "rrrrrrrr",
                mailpersonnel: "rrrrrr",
                mailprofessionnel: "rrrrrr",
                manager: "rrrrr",
                département: "rrrr",
                roleprincipal: "rrrrrrrr",
            },
        ],
        filteredUsers: [],
        editedIndex: -1,
        editedItem: {
            nom: "",
            prénom: "",
            naissance: "",
            téléphone: "",
            mailpersonnel: "",
            mailprofessionnel: "",
            manager: "",
            département: "",
            roleprincipal: "",
        },
        defaultItem: {
            nom: "",
            prénom: "",
            naissance: "",
            téléphone: "",
            mailpersonnel: "",
            mailprofessionnel: "",
            manager: "",
            département: "",
            roleprincipal: "",
        },
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? "New Item" : "Coordonnées à modifier";
        },
    },
    mounted() {
        this.filterUsers();
    },
    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        },
        searchText() {
            this.filterUsers();
        },
    },
    created() {
        this.initialize();
    },
    methods: {
        // initialize() {
        //this.users = [
        //];
        // },
        editItem(item) {
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        deleteItem(item) {
            this.editedIndex = this.users.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },
        deleteItemConfirm() {
            this.users.splice(this.editedIndex, 1);
            this.closeDelete();
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },
        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.users[this.editedIndex], this.editedItem);
            }
            else {
                this.users.push(this.editedItem);
            }
            this.close();
        },
        filterUsers() {
            if (!this.searchText) {
                this.filteredUsers = this.users;
            }
            else {
                const searchTextLower = this.searchText.toLowerCase();
                this.filteredUsers = this.users.filter(user => Object.values(user)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTextLower));
            }
        },
    },
    components: { NeoTextField }
}
</script>