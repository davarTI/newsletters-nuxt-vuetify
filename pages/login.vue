<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card>
              <v-toolbar dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <hr>
              <v-card-text>
                <v-form>
                  <v-text-field label="User" name="login" prepend-icon="person" type="text"></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  layout: 'login',
  data: () => ({
  }),
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
