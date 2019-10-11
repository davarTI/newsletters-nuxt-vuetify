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
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-text-field v-model="editedItem.target" label="Target"></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.subscribed" label="Subscribed"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field v-model="editedItem.image" label="Image"></v-text-field>
                  </v-col> -->
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
import Swal from 'sweetalert2'
import axios from 'axios'
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
      { text: 'SUBSCRIBED', value: 'subscribed' },
      { text: 'IMAGE', value: 'image' },
      { text: 'ACTIONS', value: 'action', sortable: false }
    ],
    newsletters: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      description: '',
      target: 0,
      subscribed: 0,
      image: ''
    },
    defaultItem: {
      title: '',
      description: '',
      target: 0,
      subscribed: 0,
      image: ''
    },
    URL_L: 'https://newsletters.academlo.com/api/v1/newsletters'
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
      axios
        .get(this.URL_L)
        .then((response) => {
          this.newsletters = response.data
        })
        .catch((error) => {
          console.log(error.response)
        })
    },

    editItem (item) {
      this.editedIndex = this.newsletters.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.newsletters.indexOf(item)
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        background: '#424242'
      }).then((result) => {
        if (result.value) {
          this.newsletters.splice(index, 1)
          axios
            .delete(this.URL_L + `/${item.id}`)
            .then((response) => { })
            .catch((error) => {
              console.log(error.response)
            })
          Swal.fire({
            background: '#424242',
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            type: 'success'
          })
        }
      })
      // confirm('Are you sure you want to delete this item?') && this.newsletters.splice(index, 1)
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
        axios
          .patch(this.URL_L + `/${this.editedItem.id}`, this.editedItem)
          .then((response) => {})
          .catch((error) => {
            console.log(error.response)
          })
      } else {
        axios
          .post(this.URL_L, this.editedItem)
          .then((response) => {})
          .catch((error) => {
            console.log(error.response)
          })
        this.newsletters.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
