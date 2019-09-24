<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list><br>
        <nuxt-link to="/" style="text-decoration: none">
            <v-icon class="ma-4" style="display: inline">{{ items[0].icon }}</v-icon>
            <v-list-item-title class="ma-4" style="display: inline" v-text="items[0].title"/><br><br>
        </nuxt-link><br>
        <h2 class="mb-3"></h2>
        <v-list-item v-for="(tag, i) in tags" :key="i" router exact>
          <v-list-item-action>
            <v-icon>{{ items[1].icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <nuxt-link active-class="highlighted" :to="sendSlug+tag.slug" style="text-decoration: none;">
              <v-list-item-title v-text="tag.name" class="tag-hover"/>
            </nuxt-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
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
      <span>&copy; Hecho por David</span>
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
          icon: 'mdi-home',
          title: 'All',
          to: '/'
        },
        {
          icon: 'mdi-sort'
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
      // const URL_T = process.env.VUE_APP_API + '/tags'
      const URL_T = 'https://newsletters.academlo.com/api/v1/tags'

      axios
        .get(URL_T)
        .then((response) => {
          this.tags = response.data
          // console.log(this.tags)
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
.tag-hover:hover {
  color: white;
}
</style>
