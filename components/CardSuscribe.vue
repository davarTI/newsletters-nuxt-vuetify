<template>
  <v-row>
    <v-col style="min-width: 100%">
      <!-- <v-flex class="mx-10"> -->
      <v-card>
        <v-row>
          <!-- src="https://cdn.vuetifyjs.com/images/cards/store.jpg" -->
          <div class="div-card"><br>
            <img
              :src="loadImage"
              style="border-radius: 50%; width:140px"
              class="float-right"
            ></img>
          </div>
          <div style="width: 28%">
            <v-btn class="caption">DAILY</v-btn>
          </div>
        </v-row>
        <v-row>
          <div style="min-width: 90%">
            <p class="mb-2 mt-2 ml-5 title font-weight-bold text-center">{{letter.title}}</p>
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
              <img
                src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                style="border-radius: 50%; width: 80px; height: 80px"
                class="my-5"
              ></img>
            </div>
          </v-row>
          <v-card-title style="justify-content: center" class="headline">Inside DC</v-card-title>

          <v-card-text class="text-center">Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>

          <v-text-field
            placeholder="Your email"
            outlined
            style="width: 90%; margin-left: 15px"
          >
          </v-text-field>

          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="orange darken-1" style="min-width:95%; margin-right: 7.5px; margin-bottom: 10px" @click.stop="dialog = true">Suscribe</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-row>
</template>

<script>
export default {
  props: ['letter'],
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    loadImage () {
      return this.letter.image
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
