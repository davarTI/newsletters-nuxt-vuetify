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
              <hr />
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="User"
                    name="login"
                    prepend-icon="person"
                    v-model="form.email"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    v-model="form.password"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="primary" @click="onSubmit()">Sign in</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  layout: 'login',
  data: () => ({
    form: {
      email: '',
      password: ''
    }
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  methods: {
    ...mapMutations(['login']),
    onSubmit () {
      const url = 'https://newsletters.academlo.com/api/v1/auth/login'
      axios
        .post(url, this.form)
        .then((response) => {
          this.login(response.data)
          // alert('Has iniciado sesión exitosamente!')
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert('Las credenciales proporcionadas no existen!')
          }
        })
    }
  }
}
</script>
