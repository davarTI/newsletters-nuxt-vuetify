<template>
  <v-row>
    <v-col style="min-width: 105%">
      <v-card>
        <v-row>
          <div style="width: 100%; display: flex">
            <div style="width: 20%" class="ml-2">
              <!-- :src="letter.image" -->
              <img
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                style="border-radius: 50%; width:80px; height: 80px"
                class="my-5 mx-2"
              />
              <img />
            </div>
            <div style="width: 60%" class="ml-9 mt-1">
              <!-- <br /> -->
              <h2>{{letter.name}}</h2>
              <br />
              <h4>{{letter.description}}</h4>
            </div>
          </div>
        </v-row>
        <br />
        <v-row>
          <v-btn class="justify-space-between ml-4 mr-4 text-capitalize" style="min-width:90%" @click.stop="dialog = true">
            <v-icon>mdi-email</v-icon>Vote
            <v-icon class="ml-5">mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
        <v-row style="width:95%" class="ml-2">
          <v-progress-linear
            v-model="letter.subscribed"
            height="12"
            reactive
            class="mt-2"
            background-color="white"
            color="pink"
            rounded
          ></v-progress-linear>
        </v-row>
        <div style="min-width:100%; display: flex">
          <div>
            <h2 class="caption font-weight-bold pt-1">{{letter.subscribed}}</h2>
            <h2 class="caption">SUSCRIBED</h2>
          </div>
          <div style="width: 100%">
            <h2 class="float-right caption font-weight-bold pt-1">{{letter.target}}</h2>
            <br />
            <h2 class="float-right caption">TARGET</h2>
          </div>
        </div>
        <br />
      </v-card>
    </v-col>
    <!-- Card del modal -->
    <v-row>
      <v-dialog v-model="dialog" max-width="350">
        <v-card style="overflow: hidden">
          <v-row class="text-center">
            <div style="width: 100%">
              <!-- <img :src="letter.image" style="border-radius: 50%; width: 80px; height: 80px" class="my-5"/> -->
              <img src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" style="border-radius: 50%; width: 80px; height: 80px" class="my-5"/>
            </div>
          </v-row>
          <v-card-title style="justify-content: center" class="headline">{{letter.title}}</v-card-title>

          <v-card-text class="text-center">{{letter.description}}</v-card-text>

          <v-form v-model="valid">
            <v-text-field
              placeholder="Your email"
              outlined
              style="width: 90%; margin-left: 15px"
              type="email"
              v-model="form.email"
              :rules="emailRules"
              required
            >
            </v-text-field>
          </v-form>

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="orange darken-1" style="min-width:95%; margin-right: 7.5px; margin-bottom: 10px" @click="suscribe" @click.stop="dialog = false" @keyup.enter="suscribe">Suscribe</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  props: ['letter'],
  data: () => ({
    dialog: false,
    power: '',
    valid: false,
    form: {
      email: '',
      newsletter_id: ''
    },
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]
  }),
  mounted () {
    this.power = this.letter.subscribed
  },
  updated () {
    this.letter.subscribed = this.power
  },
  methods: {
    suscribe () {
      if (this.valid) {
        const url = 'https://newsletters.academlo.com/api/v1/users'
        const data = {
          email: this.form.email,
          newsletter_id: this.letter.id
        }
        axios
          .post(url, data)
          .then((response) => {
            this.form.email = ''
            this.power = response.data.newsletter.subscribed
            Swal.fire({
              background: '#424242',
              type: 'success',
              title: 'Te has suscrito exitosamente',
              showConfirmButton: false,
              timer: 2500
            })
          })
          .catch(() => {
            console.log('Hubo un problema!')
          })
      } else {
        Swal.fire({
          background: '#424242',
          type: 'error',
          title: 'Si deseas votar el campo email no puede estar vacío!',
          showConfirmButton: false,
          timer: 2500
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
