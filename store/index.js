export const state = () => ({
  user: {},
  authenticated: false
})
export const mutations = {
  login (state, user) {
    state.user = user
    state.authenticated = true
  }
}
