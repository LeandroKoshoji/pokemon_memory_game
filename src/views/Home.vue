<template>
  <div class="home">
    <Menu />
    <div class="container">
      <h1 class="game-title">PokeMemory</h1>
      <div class="game-infos">
        <div class="time">
          <i class="far fa-clock"></i> :
          <span>00:01:55</span>
        </div>
        <div class="remaining-pairs">
          <span class="title">Remaining Pairs:</span>
          <span>5</span>
        </div>
      </div>
      <div class="board">
        <Card v-for="(pokemon, index) in pokemons" :key="index" :pokemon="pokemon"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import Menu from '@/components/Menu.vue'
import Card from '@/components/Card.vue'
export default {
  name: "Home",
  components: { Menu, Card },
  computed: {
    ...mapState(['pokemons'])
  },
  methods: {
    ...mapActions(['getPokemons'])
  },
  created(){
    this.getPokemons(12)
    
  }
}
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background-image: linear-gradient( 92.7deg,  rgba(245,212,212,1) 8.5%, rgba(252,251,224,1) 90.2% );

  .game-title {
    font-family: 'Acme', sans-serif;
    text-align: center;
    font-size: 3rem;
    letter-spacing: 3px;
    padding-top: 2rem ;

  }

  .game-infos {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    margin: 3rem 0 2rem;

    .time {
      i {
        font-size: 1.2rem;
        text-decoration: underline;
        text-decoration-color: #e12f34;
      }
    }

    .remaining-pairs {
      .title {
        font-weight: 700;
        text-decoration: underline;
        text-decoration-color: #e12f34;
        padding-right: 1rem;
      }
    }
  }
  .board {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(4, minmax(auto, 150px));
    justify-content: center;
  }
}

</style>
