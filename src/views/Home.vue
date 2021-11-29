<template>
  <div class="home">
    <Menu :isVisible="showSetupModal" @start-game="startGame($event)" />
    <WinnerModal
      :isVisible="showWinnerModal"
      @close-modal="closeWinnerModal()"
      @restart-game="startGame(difficulty)"
      @setup-new="setupNewGame()"
      :moves="playerMoves"
      :timer="timer"
    />
    <div class="container">
      <h1 class="game-title">PokeMemory</h1>
      <div class="game-options">
        <div class="timer">
          <i class="far fa-clock"></i>
          <span>{{ formattedTimer }}</span>
        </div>
        <div class="buttons">
          <button
            class="restart"
            @click="startGame(difficulty)"
            title="Restart Game"
          >
            <i class="fas fa-sync"></i>
          </button>
          <button class="setup" @click="setupNewGame()" title="Setup New Game">
            <i class="fas fa-minus-square"></i>
          </button>
        </div>
      </div>
      <div class="board" :class="gridColumn">
        <Card
          v-for="(pokemon, index) in pokemons"
          :key="index"
          :pokemon="pokemon"
          :position="index"
          :visible="pokemon.visible"
          :matched="pokemon.matched"
          :cardValue="pokemon.id"
          :disable="isDisable"
          @select-card="flipCard($event)"
        />
      </div>
      <div class="remaining-pairs">
        <span class="title">Remaining Pairs:</span>
        <span>{{ remainingPairs }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Menu from "@/components/Menu.vue";
import Card from "@/components/Card.vue";
import WinnerModal from "@/components/WinnerModal.vue";
export default {
  name: "Home",
  components: { Menu, Card, WinnerModal },
  data() {
    return {
      userSelections: [],
      timer: {
        seconds: 0,
        minutes: 0,
      },
      interval: null,
      isDisable: false,
      showWinnerModal: false,
      showSetupModal: false,
      difficulty: null,
      playerMoves: 0,
      windowWidth: null,
    };
  },
  computed: {
    ...mapState(["pokemons"]),
    formattedTimer() {
      const seconds =
        this.timer.seconds < 10 ? `0${this.timer.seconds}` : this.timer.seconds;
      const minutes =
        this.timer.minutes < 10 ? `0${this.timer.minutes}` : this.timer.minutes;

      return `${minutes}:${seconds}`;
    },
    remainingPairs() {
      const notMatched = this.pokemons.filter(
        (pokemon) => !pokemon.matched
      ).length;
      const remainingPairs = notMatched / 2;
      return remainingPairs;
    },
    gridColumn() {
      if (this.difficulty === 16 && this.windowWidth >= 1024) {
        return "grid-8";
      }
      if (this.difficulty === 12 && this.windowWidth >= 769) {
        return "grid-6";
      }
      if (this.difficulty === 8) {
        return "grid-4";
      }
      return "grid-4";
    },
  },
  methods: {
    ...mapActions(["getPokemons"]),
    flipCard(payload) {
      this.pokemons[payload.position].visible = true;
      if (payload.matched) return;
      this.playerMoves++;
      if (this.userSelections[0]) {
        // Nao permite pegar a mesma carta
        if (
          this.userSelections[0].position === payload.position &&
          this.userSelections[0].cardValue === payload.cardValue
        )
          return;

        this.$set(this.userSelections, 1, payload);
        return;
      } else {
        this.$set(this.userSelections, 0, payload);
      }
    },
    incrementTimer() {
      this.timer.seconds++;

      if (this.timer.seconds === 60) {
        this.timer.seconds = 0;
        this.timer.minutes++;
      }
    },
    startTimer() {
      this.interval = setInterval(this.incrementTimer, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
    },
    closeWinnerModal() {
      this.showWinnerModal = false;
    },
    startGame(payload) {
      const difficulty = Number(payload);
      this.stopTimer();
      this.interval = null;
      this.timer.seconds = 0;
      this.timer.minutes = 0;
      this.difficulty = difficulty;
      this.playerMoves = 0;
      this.getPokemons(this.difficulty);
      this.showSetupModal = false;
      this.startTimer();
    },
    setupNewGame() {
      this.stopTimer();
      this.interval = null;
      this.timer.seconds = 0;
      this.timer.minutes = 0;
      this.playerMoves = 0;
      this.showWinnerModal = false;
      this.showSetupModal = true;
    },
    setScreenWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
  created() {
    window.addEventListener("resize", this.setScreenWidth);
    this.setScreenWidth();
    this.showSetupModal = true;
  },
  watch: {
    userSelections: {
      handler(currentValue) {
        const firstPick = currentValue[0];
        const secondPick = currentValue[1];

        if (currentValue.length === 2) {
          if (firstPick.cardValue === secondPick.cardValue) {
            this.pokemons[firstPick.position].matched = true;
            this.pokemons[secondPick.position].matched = true;
          } else {
            const turnVisibleOff = () => {
              this.pokemons[firstPick.position].visible = false;
              this.pokemons[secondPick.position].visible = false;
              this.isDisable = false;
            };

            this.isDisable = true;
            setTimeout(turnVisibleOff, 1500);
          }

          this.userSelections.splice(0);
        }
      },
      deep: true,
    },
    remainingPairs(currentValue) {
      if (currentValue === 0) {
        this.showWinnerModal = true;
        this.stopTimer();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background-color: #f5f5f5;

  .game-title {
    font-family: "Acme", sans-serif;
    text-align: center;
    font-size: 3rem;
    letter-spacing: 3px;
    padding-top: 2rem;
  }

  .game-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 0;

    .timer {
      display: flex;
      align-items: center;
      i {
        padding-right: 0.5rem;
        font-size: 1.2rem;
        color: #e12f34;
      }
    }
    .buttons {
      display: flex;
      gap: 1rem;
      button {
        font-size: 1rem;
        font-weight: 700;
        background-color: white;
        border: 2px solid #e12f34;
        margin: 0.5rem 0;
        padding: 0.5rem;
        border-radius: 5px;
        outline: none;
        cursor: pointer;
        transition: all ease 0.2s;
        &:hover,
        &:active {
          background: rgb(225, 47, 52);
          color: white;
          border: 2px solid black;
        }
      }
    }
  }

  .remaining-pairs {
    padding: 2rem 0;
    text-align: center;
    .title {
      font-weight: 700;
      text-decoration: underline;
      text-decoration-color: #e12f34;
      padding-right: 1rem;
    }
  }
  .board {
    position: relative;
    display: grid;
    gap: 1.5rem;
    justify-content: space-between;

    &.grid-4 {
      grid-template-columns: repeat(4, minmax(auto, 180px));
    }
    &.grid-6 {
      grid-template-columns: repeat(6, minmax(auto, 180px));
    }
    &.grid-8 {
      grid-template-columns: repeat(8, minmax(auto, 180px));
    }
  }
}
</style>
