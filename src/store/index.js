import Vue from 'vue'
import Vuex from 'vuex'
import { getPokemonUrl,  generateArrayWithPokemonsID} from '@/utils/api.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemons: [],
    loading: null,
    error: null
  },
  mutations: {
    setPokemons(state, pokemons) {
      state.pokemons = pokemons
    },
    setLoading(state, loadingStatus) {
      state.loading = loadingStatus
    },
    setError(state, err) {
      state.loading = err
    }
  },
  actions: {
    async getPokemons({ commit },qntd) {
      const pokemonsID = generateArrayWithPokemonsID(qntd)
      const pokemonsPromises =  pokemonsID.map(pkID => 
        fetch(getPokemonUrl(pkID)).then(r => r.json()))

      try {
        commit('setLoading', true)
        const data = await Promise.all(pokemonsPromises)
        console.log(data)
        commit('setPokemons', data)
      } catch (err) {
        commit('setError', err.message)
      } finally {
        commit('setLoading', false)
      }
  } 
  },
  modules: {
  }
})
