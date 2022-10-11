export * from './types/statusCodeRange'

import { BaseClient } from './baseClient'

const client = new BaseClient({
    clientName: 'PokemonApiClient',
    baseURL: 'https://pokeapi.co/api/v2/',
    headers: {
        'X-Access-Token': 'token'
    },
    responseHandlers: {
        errorOnUndescribedSuccessStatus: false,
        axiosSuccessRange: {
            200: {
                msg: 'Dobrze',
                treatAs: 'ERROR'
            }
        },
        axiosErrorRange: {}
    }
})


interface Pokemon {
    name: string
    age: number
}

export const ApiTree = {
    v1: {
        pokemon: {
            getByName: (name: string) => client.get<Pokemon>(`pokemon/${ name }`)
        },
        // GET
        getPokemonByName: (name: string) => client.get<Pokemon>(`pokemon/${ name }`),

        // POST
        createUser: (name: string, surname: string) => client.post<Pokemon>(`${ name }`),

        // Put 
        updateUser: (newName: string) => client.deleteWithRawResponse<Pokemon>('x'),
    },
    v2: {

    },
    v3: {

    }
}

const displayUser = async () => {
    const user = await ApiTree.v1.pokemon.getByName('ditto')

    // console.log(user)
}

displayUser()