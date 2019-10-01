<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-toolbar-title class="white--text">
        <nuxt-link to="/" style="text-decoration: none">
        [ INSIDE ]
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <!-- <v-btn text>Sign in</v-btn> -->
      <v-icon>mdi-account</v-icon>
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
export default {
  data () {
    return {
      clipped: false
    }
  }
}
</script>

<style scoped>
</style>
