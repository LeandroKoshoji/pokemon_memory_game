<template>
  <div class="card">
    <div class="card-inner" :class="isCardFlipped" @click="flipCard()">
      <div class="card-face is-front" :class="pokemonFirstType">
        <div class="card-content">
          <img
            :src="pokemon.sprites.front_default"
            alt=""
            class="pokemon_img"
          />
          <p class="pokemon_name" v-if="!isMobile">{{ pokemonName }}</p>
          <p class="pokemon_type" v-if="!isMobile">
            {{ pokemonTypes }}
          </p>
        </div>
      </div>
      <div class="card-face is-back">
        <span>Poke</span>
        <span>Memory</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    pokemon: {
      require: true,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  data(){
      return {
          isMobile: null,
          windowSize: null
      }
  },
  computed: {
    isCardFlipped() {
      if (this.visible) {
        return "is-flipped";
      }
      return "";
    },
    pokemonFirstType() {
      // This is for the background-color based on pokemon first class
      return this.pokemon.types[0].type.name;
    },
    pokemonName() {
      return `${this.pokemon.name
        .charAt(0)
        .toUpperCase()}${this.pokemon.name.slice(1)}`;
    },
    pokemonTypes() {
      return this.pokemon.types
        .map((type) => {
          return `${type.type.name
            .charAt(0)
            .toUpperCase()}${type.type.name.slice(1)}`;
        })
        .join(" | ");
    },
  },
  methods: {
    flipCard() {
      this.visible = !this.visible;
    },
    checkScreen() {
        this.windowSize = window.innerWidth
        if(this.windowSize <= 750) {
            this.isMobile = true
            return
        }
        this.isMobile = false
        return
    }
  },
  created(){
      window.addEventListener('resize', this.checkScreen)
      this.checkScreen()
  },
  
};
</script>

<style lang="scss" scoped>
.card {
  width: auto;
  max-width: 150px;
  aspect-ratio: 1;

  .card-inner {
    width: 100%;
    height: 100%;
    transition: transform 0.5s;
    transform-style: preserve-3d;
    cursor: pointer;
    position: relative;

    &.is-flipped {
      transform: rotateY(180deg);
    }
  }

  .card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 10px;
    box-shadow: 0px 3px 10px 3px rgba(0, 0, 0, 0.2);

    &.is-front {
      transform: rotateY(180deg);

      .card-content {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .pokemon_img {
          max-width: 96px;
        }

        .pokemon_name {
          font-weight: 700;
          font-size: 1rem;
          text-align: center;
        }
        .pokemon_type {
          padding-top: 1rem;
          font-size: 0.75rem;
          text-align: center;
        }
      }

      &.steel {
        background-color: #f4f4f4;
      }

      &.fire {
        background-color: #fddfdf;
      }

      &.grass {
        background-color: #defde0;
      }

      &.electric {
        background-color: #fcf7de;
      }

      &.water,
      &.ice {
        background-color: #def3fd;
      }

      &.ground {
        background-color: #f4e7da;
      }

      &.rock {
        background-color: #d5d5d4;
      }

      &.fairy {
        background-color: #fceaff;
      }

      &.poison {
        background-color: #98d7a5;
      }

      &.bug {
        background-color: #f8d5a3;
      }

      &.dragon {
        background-color: #97b3e6;
      }

      &.psychic {
        background-color: #eaeda1;
      }

      &.flying {
        background-color: #f5f5f5;
      }

      &.fighting {
        background-color: #e6e0d4;
      }

      &.normal,
      &.ghost {
        background-color: #f5f5f5;
      }
    }
    &.is-back {
      font-family: "Acme", sans-serif;
      font-size: clamp(0.75rem, 2vw, 1rem);
      border: 3px solid black;
      background-color: #e12f34;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  }
}
</style>
