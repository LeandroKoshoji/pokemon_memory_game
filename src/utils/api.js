const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'
const pokemonsAmount = 150

export const getPokemonUrl = (id) => `${BASE_URL}${id}`

export const getRandomNumber = (min, max) => {
    const minValue = Math.ceil(min)
    const maxValue = Math.floor(max)

    return Math.floor(Math.random() * (maxValue - minValue)) + minValue
}

export const generateArrayWithPokemonsID = (qntd) => {
    return Array(qntd).fill().map(()=> getRandomNumber(1, pokemonsAmount))
}

