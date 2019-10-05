<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <br><br>
        <h2 class="mb-3"></h2>
        <v-list-item v-for="(tag, i) in tags" :key="i" router exact>
          <v-list-item-action>
            <v-icon style="color: black">{{ items[i].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link :to="'/category/'+tag.slug" style="text-decoration: none;">
              <v-btn
                text
                style="color: rgb(245, 245, 245, 1)"
                v-text="tag.name"
                class="text-capitalize"
                outlined
                block
              />
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text">
        <nuxt-link to="/" style="text-decoration: none">
        [ INSIDE ]
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn @click="logout()">Sign out</v-btn>
      <v-btn text>Dashboard</v-btn>
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
      clipped: false,
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
    },
    logout () {
      return !this.authenticated && this.$router.push('/login')
    }
  },
  middleware: 'authenticated'
}
</script>

<style scoped>
</style>
