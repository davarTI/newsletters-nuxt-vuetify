<template>
  <v-data-table
    :headers="headers"
    :items="newsletters"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.target" label="Target"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.suscribed" label="Suscribed"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="editedItem.image" label="Image"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        edit
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  layout: 'dashboard',
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'TITLE',
        align: 'left',
        sortable: false,
        value: 'title'
      },
      { text: 'DESCRIPTION', value: 'description' },
      { text: 'TARGET', value: 'target' },
      { text: 'SUSCRIBED', value: 'suscribed' },
      { text: 'IMAGE', value: 'image' },
      { text: 'ACTIONS', value: 'action', sortable: false }
    ],
    newsletters: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      description: '',
      target: 0,
      suscribed: 0,
      image: ''
    },
    defaultItem: {
      title: '',
      description: '',
      target: 0,
      suscribed: 0,
      image: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.close()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.newsletters = [
        {
          title: 'Inside Security',
          description: 'David Strom`s in-depth cybersecurity news and analysis',
          target: 6.0,
          suscribed: 24,
          image: ''
        }
      ]
    },

    editItem (item) {
      this.editedIndex = this.newsletters.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.newsletters.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.newsletters.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.newsletters[this.editedIndex], this.editedItem)
      } else {
        this.newsletters.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
