<template>
  <v-row>
    <v-col style="min-width: 100%">
      <!-- <v-flex class="mx-10"> -->
      <v-card>
        <v-row>
          <div class="div-card"><br>
            <!-- :src="loadImage" -->
            <img
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              style="border-radius: 50%; width:140px"
              class="float-right"
            />
          </div>
          <div style="width: 28%">
            <v-btn class="caption">DAILY</v-btn>
          </div>
        </v-row>
        <v-row>
          <div style="min-width: 90%">
            <p class="mb-2 mt-2 ml-5 title font-weight-bold text-center">{{letter.name}}</p>
          </div>
          <p class="body-1 ml-5 text-justify" style="width: 80%">{{letter.description}}</p>
        </v-row>
        <v-row>
          <v-btn class="text-capitalize justify-space-between ml-4" style="min-width:90%" @click.stop="dialog = true">
            <v-icon left>mdi-email</v-icon>
            Suscribe
            <v-icon class="ml-12">mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
        <br />
      </v-card>
      <!-- </v-flex> -->
    </v-col>
    <!-- Card del modal -->
    <v-row>
      <v-dialog v-model="dialog" max-width="350">
        <v-card style="overflow: hidden">
          <v-row class="text-center">
            <div style="width: 100%">
              <!-- :src="loadImage" -->
              <img
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                style="border-radius: 50%; width: 80px; height: 80px"
                class="my-5"
              />
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
            <v-btn color="orange darken-1" style="min-width:95%; margin-right: 7.5px; margin-bottom: 10px" @click="suscribe" @click.stop="dialog = false">Suscribe</v-btn>
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
  data () {
    return {
      dialog: false,
      valid: false,
      form: {
        email: '',
        newsletter_id: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    loadImage () {
      return this.letter.image
    }
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
            Swal.fire({
              background: '#424242',
              type: 'success',
              title: 'Te has suscrito exitosamente',
              showConfirmButton: false,
              timer: 2500
            })
          })
          .catch(() => {
            console.log('Hubo un error!')
          })
      } else {
        Swal.fire({
          background: '#424242',
          type: 'error',
          title: 'Si deseas subscribirte el campo email no puede estar vacío!',
          showConfirmButton: false,
          timer: 2500
        })
      }
    }
  }
}
</script>

<style scoped>
.div-card{
   width: 72%
}

@media only screen and (min-width: 360px) and (max-width: 600px) {
  .div-card{
    width: 62%
  }
}
</style>
