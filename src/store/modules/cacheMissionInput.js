export default {
  namespaces: false,
  state: {
    missionInput: {}
  },
  mutations: {
    CACHE_MISSION_INPUT(state, params) {
      console.log(params)
      state.missionInput = params
    }
  },
  actions: {
    cacheMissionInput({ commit }, params) {
      commit('CACHE_MISSION_INPUT', params)
    }
  }
}