<template>
  <div class="home">
    <Menu />
    <div class="container">
    </div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import Menu from '@/components/Menu.vue'
export default {
  name: "Home",
  components: { Menu },
  computed: {
    ...mapState(['pokemons'])
  },
  methods: {
    ...mapActions(['getPokemons'])
  },
  created(){
    this.getPokemons(8)
    
  }
}
</script>

<style lang="scss" scoped>

</style>
