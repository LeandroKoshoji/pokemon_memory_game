<template>
    <div class="menu-wrapper" v-if="isVisible">
        <div class="menu">
            <h1 class="game-title">Welcome to PokeMemory</h1>
            <p class="instructions-title">How to Play:</p>
            <p class="instructions-desc">The objective of the game is to capture all the Pokemons in the shortest time possible. To play, you must turn 2 cards. If you turn two cards that doesn't match, both cards will be turned face down again in the same spot. If you turn a pair of matching cards, you will capture the Pokemon.</p>
            <p>Choose difficulty:</p>
            <form class="form">
                <div class="difficulties">
                    <input type="radio" id="easy" name="difficulty" value="8" checked>
                    <label for="easy">Easy</label>
                    <input type="radio" id="medium" name="difficulty" value="12">
                    <label for="medium">Medium</label>
                    <input type="radio" id="hard" name="difficulty" value="16">
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
            default: false
        }
    }
}
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
        border: 2px solid red;
        border-radius: 10px;

        .game-title {
            text-align: center;
            padding-bottom: 1rem;
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
                    background-color: cyan;
                }

                & label {
                    background-color: chocolate;
                padding: 0.5rem 1rem;
                border-radius: 10px;
                }
            }

            button {
                background-color: chocolate;
                padding: 0.5rem 1rem;
                border-radius: 10px;
                border: none;
                outline: none;
            }
        }
    }
}
</style>