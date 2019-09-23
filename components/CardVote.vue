<template>
  <v-row>
    <v-col v-for="n in 4" :key="n" sm="4" md="3">
      <v-card>
        <v-row>
          <div style="width: 100%; display: flex">
            <div style="width: 20%" class="ml-2">
              <img
                src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                style="border-radius: 50%; width:70px; height: 80px"
                class="my-5 mx-2"
              />
              <img />
            </div>
            <div style="width: 60%" class="ml-10">
              <br />
              <h2>Inside DC</h2>
              <br />
              <h4>Greyhound divisely hello coldly fonwderfully.</h4>
            </div>
          </div>
        </v-row>
        <br />
        <v-row>
          <v-btn class="justify-space-between ml-4 mr-4 text-capitalize" style="min-width:90%">
            <v-icon>mdi-email</v-icon>
            Vote
            <v-icon class="ml-5">mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
        <v-row style="width:95%" class="ml-2">
          <v-progress-linear
            v-model="power"
            height="12"
            reactive
            class="mt-2"
            background-color="white"
            color="pink"
            rounded
          ></v-progress-linear>
        </v-row>
        <div style="min-width:100%; display: flex">
          <div>
            <h2 class="caption font-weight-bold pt-1">3000</h2>
            <h2 class="caption">SUSCRIBED</h2>
          </div>
          <div style="width: 100%">
            <h2 class="float-right caption font-weight-bold pt-1">3000</h2><br>
            <h2 class="float-right caption">TARGET</h2>
          </div>
        </div>
        <br />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: [],
  data: () => ({
    power: 78
  })
}
</script>

<style scoped>

</style>
