<template>
  <v-container class="lighten-5">
    <v-row justify="center">
      <h2>Live newsletters</h2>
    </v-row>
    <v-row justify="center">
      <h4>Packed with the trends, news & links you need to be smart, informed, and ahead of the curve.</h4>
    </v-row>
    <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
    <v-row>
      <v-col v-for="n in 8" :key="n" cols="6" md="3">
        <v-card class outlined tile>
          <v-card>
            <v-list-item three-line>
              <v-list-item-content>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
                  style="border-radius: 50%"
                  class="my-5"
                ></v-img>
                <v-list-item-title class="mb-2">Inside streaming</v-list-item-title>
                <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
              </v-list-item-content>

              <v-btn class="ml-2" style="top: -60px">DAILY</v-btn>
            </v-list-item>

            <v-card-actions>
              <v-btn >Button
                <v-icon right>mdi-chevron-right</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
