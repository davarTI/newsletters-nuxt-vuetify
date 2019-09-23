<template>
  <v-container fluid>
    <v-row justify="center">
      <h2>Live newsletters</h2>
    </v-row>
    <v-row justify="center">
      <h4>Packed with the trends, news & links you need to be smart, informed, and ahead of the curve.</h4>
    </v-row>
    <v-row>
        <v-col v-for="(letter, index) in individualLetters.newsletters" :key="index" sm="4" md="3">
          <card-suscribe :letter="letter"></card-suscribe>
        </v-col>
    </v-row>
    <v-row id="div-hide" v-show="false">
      <v-flex style="max-width:280px">
        <h2 class="text-center">Interested in sponsoring a newsletter?</h2>
        <v-row class="text-center">
          <div style="width: 100%">
            <img
              src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
              style="border-radius: 50%; width: 100px; height: 100px"
              class="my-5"
            ></img>
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
    </v-row>
    <card-vote></card-vote>
  </v-container>
</template>

<script>
import axios from 'axios'
import CardSuscribe from '../../components/CardSuscribe.vue'
import CardVote from '../../components/CardVote.vue'

export default {
  components: {
    CardSuscribe,
    CardVote
  },
  data () {
    return {
      individualLetters: []
    }
  },
  mounted () {
    this.getLetterByCategory()
  },
  methods: {
    getLetterByCategory () {
      // const urlFromHome = window.location.href
      // const slug = urlFromHome.split('?')
      const slug = this.$route.params.category
      const URL_L = `https://newsletters.academlo.com/api/v1/tags/${slug}?include=newsletters`

      axios
        .get(URL_L)
        .then((response) => {
          this.individualLetters = response.data
          // console.log(this.individualLetters)
        })
        .catch((error) => {
          console.log(error.response)
          alert('Existe un problema al cargar la información solicitada.')
        })
    }
  }
}
</script>

<style scoped>

</style>
