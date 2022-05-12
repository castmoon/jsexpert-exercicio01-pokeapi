const TeamRepository = require('../repository/teamRepository');

class TeamService {
	constructor({ teamRepository } = {}) {
		this.teamRepository = teamRepository || new TeamRepository();
	}

	getRandomPositionFromArray(array) {
		return Math.floor(Math.random() * array.length);
	}

	getMultipleRandomItemsFromArray(list, size) {
		return Array(size)
			.fill(0)
			.map((_) => list[this.getRandomPositionFromArray(list)]);
	}

	async getTeam() {
		const pokemons = await this.teamRepository.listPokemons();

		const randomPokemons = this.getMultipleRandomItemsFromArray(
			pokemons,
			3
		);

		const response = await Promise.all(
			randomPokemons.map(async (randomPokemon) => {
				const allPokemonData = await this.teamRepository.findPokemon(
					randomPokemon.url
				);

				const pokemon = {
					name: allPokemonData.name,
					moves: allPokemonData.moves.slice(0, 3),
				};

				return pokemon;
			})
		);

		return response;
	}
}

module.exports = TeamService;
