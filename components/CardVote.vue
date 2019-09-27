<template>
  <v-row>
    <v-col style="min-width: 105%">
      <v-card>
        <v-row>
          <div style="width: 100%; display: flex">
            <div style="width: 20%" class="ml-1">
              <img
                :src="loadImage"
                style="border-radius: 50%; width:70px; height: 80px"
                class="my-5 mx-2"
              />
              <img />
            </div>
            <div style="width: 60%" class="ml-10">
              <br />
              <h2>{{letter.title}}</h2>
              <br />
              <h4>{{letter.description}}</h4>
            </div>
          </div>
        </v-row>
        <br />
        <v-row>
          <v-btn class="justify-space-between ml-4 mr-4 text-capitalize" style="min-width:90%">
            <v-icon>mdi-email</v-icon>Vote
            <v-icon class="ml-5">mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
        <v-row style="width:95%" class="ml-2">
          <v-progress-linear
            v-model="power"
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
            <h2 class="caption font-weight-bold pt-1">{{power}}</h2>
            <h2 class="caption">SUSCRIBED</h2>
          </div>
          <div style="width: 100%">
            <h2 class="float-right caption font-weight-bold pt-1">300</h2>
            <br />
            <h2 class="float-right caption">TARGET</h2>
          </div>
        </div>
        <br />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
export default {
  props: ['letter'],
  data: () => ({
    // cards: [],
    power: '',
    temp: ''
  }),
  computed: {
    loadImage () {
      return this.letter.image
    }
  },
  mounted () {
    this.suscribe()
  },
  methods: {
    suscribe () {
      const url = 'https://newsletters.academlo.com/api/v1/users'
      axios
        .get(url)
        .then((response) => {
          this.temp = (response.data.length * 100) / 300
          this.power = this.temp.toFixed()
          // console.log(response.data.length)
        })
        .catch((error) => {
          console.log(error.response)
        })
    }
  }
}
</script>

<style scoped>
</style>
