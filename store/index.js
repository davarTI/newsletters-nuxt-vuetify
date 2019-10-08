export const state = () => ({
  user: {},
  authenticated: false
})
export const mutations = {
  login (state, user) {
    state.user = user
    state.authenticated = true
  },
  closeSession (state) {
    state.user = null
    state.authenticated = false
  }
}
