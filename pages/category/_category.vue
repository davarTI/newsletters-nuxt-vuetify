<template>
  <v-container fluid>
    <v-row justify="center">
      <h2>Live newsletters</h2>
    </v-row>
    <v-row justify="center">
      <h4>Packed with the trends, news & links you need to be smart, informed, and ahead of the curve.</h4>
    </v-row>
    <v-row>
        <div class="spinner" id="loader">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
        <!-- <div class="mt-7 ml-4 title" style="color: orange" id="mi_div">Cargando....</div> -->
        <v-row class="mt-7 text-center title" style="color: orange; display: none" id="content">No existen boletines para la categoría seleccionada.</v-row>
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
    <!-- <v-row justify="center">
      <h2>Up-and-coming</h2>
    </v-row>
    <v-row justify="center">
      <h4>If these newsletters reach their goals (or get a sponsorship), we'll bring on experts writers and launch them. Vote for all your favorites.</h4>
    </v-row> -->
    <!-- <card-vote></card-vote> -->
  </v-container>
</template>

<script>
import axios from 'axios'
import CardSuscribe from '../../components/CardSuscribe.vue'
// import CardVote from '../../components/CardVote.vue'

export default {
  components: {
    CardSuscribe
    // CardVote
  },
  data () {
    return {
      individualLetters: {
        newsletters: []
      }
    }
  },
  mounted () {
    this.getLetterByCategory()
  },
  methods: {
    getLetterByCategory () {
      const slug = this.$route.params.category
      const URL_L = `https://newsletters.academlo.com/api/v1/tags/${slug}?include=newsletters`
      axios
        .get(URL_L)
        .then((response) => {
          this.individualLetters = response.data
          // console.log(this.individualLetters)
          const loader = document.getElementById('loader')
          const msg = document.getElementById('content')
          loader.style.display = 'none'
          if (this.individualLetters.newsletters.length < 1) {
            msg.style.display = 'block'
          }
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
.spinner {
  margin: 20px auto 0;
  width: 70px;
  text-align: center;
}

.spinner > div {
  width: 18px;
  height: 18px;
  background-color: white;

  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% {
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}
</style>
