<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <br>
        <nuxt-link to="/" style="text-decoration: none">
            <v-icon class="ma-4" style="display: inline; color: white">home</v-icon>
            <v-btn class="ma-4 text-capitalize" style="display: inline; color: white" v-text="items[0].title"/>
        </nuxt-link>
        <h2 class="mb-3"></h2>
        <v-list-item v-for="(tag, i) in tags" :key="i" router exact>
          <v-list-item-action>
            <v-icon style="color: black">{{ items[i].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link :to="sendSlug+tag.slug" style="text-decoration: none;">
              <v-btn
                text
                style="color: rgb(245, 245, 245, 1)"
                v-text="tag.name"
                class="text-capitalize"
              />
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-spacer /> -->
      <v-toolbar-title class="white--text">[ INSIDE ]</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn>SPONSORSHIP</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <v-spacer />
      <span>&copy; Desarrollador por: David Armijos</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      drawer: false,
      fixed: false,
      tags: [],
      items: [
        {
          icon: 'computer',
          title: 'All',
          to: '/'
        },
        {
          icon: 'business_center'
        },
        {
          icon: 'public'
        },
        {
          icon: 'local_movies'
        },
        {
          icon: 'ac_unit'
        }
      ]
    }
  },
  computed: {
    sendSlug () {
      return '/category/'
    }
  },
  mounted () {
    this.getTags()
  },
  methods: {
    getTags () {
      // const URL_T = process.env.apiUrl + '/tags'
      const URL_T = 'https://newsletters.academlo.com/api/v1/tags'
      axios
        .get(URL_T)
        .then((response) => {
          this.tags = response.data
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
