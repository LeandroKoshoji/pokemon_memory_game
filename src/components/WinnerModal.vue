<template>
  <div class="wrapper" v-if="isVisible" @click="closeModal()">
    <div class="modal">
      <p class="greetings">Great Job!</p>
      <p class="greetings">You captured all pokemons!</p>
      <p class="stats-title">Game Stats:</p>
      <div class="stat">
        <span class="stat-title">Time Elapsed</span>
        <span class="stat-result">{{formattedTimer}}</span>
      </div>
      <div class="stat">
        <span class="stat-title">Moves Taken</span>
        <span class="stat-result">{{moves / 2}} Moves</span>
      </div>
      <button class="restart" @click="restartGame()">Restart</button>
      <button class="setup" @click="setupNewGame()">Setup New Game</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WinnerModal",
  props: {
    isVisible: {
      default: false,
    },
    moves: {
      require: true,
    },
    timer: {
      require: true,
    }
  },
  computed: {
    formattedTimer() {
      const seconds =
        this.timer.seconds < 10 ? `0${this.timer.seconds}` : this.timer.seconds;
      const minutes =
        this.timer.minutes < 10 ? `0${this.timer.minutes}` : this.timer.minutes;

      return `${minutes}:${seconds}`;
    }
  },
  methods: {
    closeModal(){
        this.$emit('close-modal')
    },
    restartGame(){
      this.$emit('restart-game')
    },
    setupNewGame(){
      this.$emit('setup-new')
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;

  .modal {
    position: relative;
    background-color: white;
    width: 100%;
    max-width: 500px;
    padding: 1rem;
    border: 3px solid#e12f34;
    border-radius: 5px;

    .greetings {
      font-weight: 700;
      text-align: center;
      font-size: 1.25rem;
    }

    .stats-title {
      font-size: 0.9rem;
      padding: 2rem 0 0;
      font-weight: 700;
    }
    .stat {
      display: flex;
      justify-content: space-between;
      border-radius: 5px;
      margin: 0.5rem 0;
      padding: 0.5rem;
      background-color: #e5e5e5;

      .stat-title {
        font-weight: 700;
        font-size: 0.9rem;
      }

      .stat-result {
        font-weight: 700;
      }
    }

    button {
      display: block;
      width: 100%;
      font-size: 1rem;
      font-weight: 700;
      background-color: white;
      border: 2px solid #e12f34;
      padding: 0.5rem 1rem;
      margin: 0.5rem 0;
      border-radius: 10px;
      outline: none;
      cursor: pointer;
      transition: all ease 0.2s;
      &:hover,
      &:active {
        background: rgb(225, 47, 52);
        color: white;
        border: 2px solid black;
      }

      &.restart {
        margin-top: 2rem;
      }
    }
  }
}
</style>
