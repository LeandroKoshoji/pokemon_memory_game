<template>
  <div class="menu-wrapper" v-if="isVisible">
    <div class="menu">
      <h1 class="game-title">Welcome to PokeMemory</h1>
      <p class="instructions-title">How to Play:</p>
      <p class="instructions-desc">
        The objective of the game is to capture all the Pokemons in the shortest
        time possible. To play, you must turn 2 cards. If you turn two cards
        that doesn't match, both cards will be turned face down again in the
        same spot. If you turn a pair of matching cards, you will capture the
        Pokemon.
      </p>
      <p class="difficulty-title">Choose difficulty:</p>
      <form class="form">
        <div class="difficulties">
          <input type="radio" id="easy" name="difficulty" value="8" checked />
          <label for="easy">Easy</label>
          <input type="radio" id="medium" name="difficulty" value="12" />
          <label for="medium">Medium</label>
          <input type="radio" id="hard" name="difficulty" value="16" />
          <label for="hard">Hard</label>
        </div>
        <button type="submit">Start the Game</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "Menu",
  props: {
    isVisible: {
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-wrapper {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;

  .menu {
    position: relative;
    background-color: white;
    width: 100%;
    max-width: 500px;
    padding: 1rem;
    border: 5px solid#e12f34;
    border-radius: 10px;

    .game-title {
      text-align: center;
      padding-bottom: 2rem;
    }

    .instructions-title,
    .difficulty-title {
        font-weight: bold;
        text-decoration: underline;
        text-decoration-color: #e12f34;
    }

    .instructions-desc {
      margin: 1rem 0;
      text-align: justify;
      line-height: 1.5;
    }

    .form {
      display: flex;
      flex-direction: column;

      .difficulties {
        display: flex;
        margin: 1rem 0;
        justify-content: space-between;

        & input {
          display: none;
        }
        & input:checked + label {
          background-color: #e12f34;
          color: white;
          border: 2px solid black;
          transform: scale(1.1);
        }

        & label {
          font-weight: 700;
          background-color: white;
          border: 2px solid #e12f34;
          padding: 0.25rem 1rem;
          border-radius: 10px;
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

      button {
        font-size: 1rem;
        font-weight: 700;
        background-color: white;
        border: 2px solid #e12f34;
        padding: 0.5rem 1rem;
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
      }
    }
  }
}
</style>
