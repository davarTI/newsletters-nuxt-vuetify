<template>
  <v-app>
    <ValidationObserver ref="observer" v-slot="{ passes }">
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
                    <ValidationProvider
                      rules="required|email"
                      name="email"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        label="User"
                        name="login"
                        prepend-icon="person"
                        v-model="form.email"
                        type="text"
                        @keyup.enter="passes(onSubmit)"
                      ></v-text-field>
                      <small class="ml-8" style="color: hsl(12, 100%, 43%)">{{ errors[0] }}</small>
                    </ValidationProvider>
                    <ValidationProvider
                      rules="required"
                      name="password"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="lock"
                        v-model="form.password"
                        type="password"
                        @keyup.enter="passes(onSubmit)"
                      ></v-text-field>
                      <small class="ml-8" style="color: hsl(12, 100%, 43%)">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <div class="flex-grow-1"></div>
                  <v-btn color="primary" @click="passes(onSubmit)">Sign in</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </ValidationObserver>
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
          // console.log(response.data.api_token)
          this.$router.push('/dashboard')
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert('El email o password proporcionados no existen!')
          }
        })
    }
  }
}
</script>
