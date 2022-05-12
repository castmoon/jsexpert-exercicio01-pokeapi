const https = require('https');

const base_url_api = 'https://pokeapi.co/api/v2';

class TeamRepository {
	async makeRequest(url) {
		const chunks = [];
		return new Promise((resolve, reject) => {
			https.get(url, (response) => {
				response.on('data', (data) => {
					chunks.push(data);
				});
				response.on('error', reject);
				response.on('end', () => {
					const data = Buffer.concat(chunks);
					resolve(JSON.parse(data));
				});
			});
		});
	}

	async listPokemons() {
		const data = await this.makeRequest(`${base_url_api}/pokemon`);
		return data.results;
	}

	async findPokemon(url) {
		const data = await this.makeRequest(url);
		const pokemon = {
			name: data.name,
			moves: data.moves.map((move) => move.move.name),
		};
		return pokemon;
	}
}

module.exports = TeamRepository;
