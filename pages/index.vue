<template>
  <v-container fluid>
    <v-row justify="center">
      <h2>Real news, curated by real humans</h2>
    </v-row>
    <v-row justify="center">
      <h4>Packed with the trends, news & links you need to be smart, informed, and ahead of the curve.</h4>
    </v-row><br>
    <v-row style="display: flex">
      <v-col v-for="(letter, index) in filterByTarget" :key="index" sm="4" md="3">
        <card-suscribe :letter="letter"></card-suscribe>
      </v-col><br>
      <v-flex style="max-width:270px" class="mt-5">
        <h2 class="text-center">Interested in sponsoring a newsletter?</h2>
        <v-row class="text-center">
          <div style="width: 100%">
            <img
              src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
              style="border-radius: 50%; width: 100px; height: 100px"
              class="my-5"
            />
          </div>
        </v-row>
        <h3 class="text-center">[ Your logo here ]</h3>
        <br />
        <v-btn style="min-width:95%; margin-left: 15px">GET IN TOUCH</v-btn>
      </v-flex>
    </v-row>
    <br><br>
    <v-row justify="center">
      <h2>Up-and-coming</h2>
    </v-row>
    <v-row justify="center">
      <h4>If these newsletters reach their goals (or get a sponsorship), we'll bring on experts writers and launch them. Vote for all your favorites.</h4>
    </v-row><br>
    <v-row style="display: flex">
      <v-col v-for="(letter, idx) in filterBySubs" :key="idx" sm="4" md="3">
        <card-vote :letter="letter"></card-vote>
      </v-col><br>
      <v-flex style="max-width: 270px" class="mt-5">
        <h2 class="text-center">Have an idea for a newsletter?</h2>
        <v-row class="text-center">
          <div style="width: 100%">
            <img
              src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
              style="border-radius: 50%; width: 100px; height: 100px"
              class="my-5"
            />
          </div>
        </v-row>
        <br />
        <v-btn style="min-width:90%; margin-left: 25px">Propose a newsletter</v-btn>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import CardSuscribe from '../components/CardSuscribe.vue'
import CardVote from '../components/CardVote.vue'

export default {
  components: {
    CardSuscribe,
    CardVote
  },
  data () {
    return {
      letters: []
    }
  },
  mounted () {
    this.getAllNewsLetters()
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()

    //   setTimeout(() => this.$nuxt.$loading.finish(), 200)
    // })
  },
  computed: {
    filterBySubs () {
      return this.letters.filter(letter => letter.target > letter.subscribed)
    },
    filterByTarget () {
      return this.letters.filter(letter => letter.target <= letter.subscribed)
    }
  },
  methods: {
    getAllNewsLetters () {
      // const URL_L = process.env.apiUrl + '/newsletters'
      // const URL_L = 'https://newsletters.academlo.com/api/v1/newsletters'
      const URL_L = 'https://app-mevn-my-api.herokuapp.com/api/newsletters'
      axios
        .get(URL_L)
        .then((response) => {
          this.letters = response.data
          this.$nextTick(() => {
            this.$nuxt.$loading.start()

            setTimeout(() => this.$nuxt.$loading.finish(), 200)
          })
        })
        .catch((error) => {
          console.log(error.response)
          // alert('Existe un problema al cargar la información solicitada.')
        })
    }
  }
}
</script>

<style scoped>

</style>
