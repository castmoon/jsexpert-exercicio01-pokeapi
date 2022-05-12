const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const {
	teamRepositoryMock,
	mocks,
	urls,
} = require('../mocks/teamRepository.mock');

describe('Name of the group', () => {
	let teamRepository = {};
	before(() => {
		teamRepository = teamRepositoryMock;
	});

	it('should make request with correct url', async () => {
		const expected = mocks.pokemons;

		const result = await teamRepository.makeRequest(urls.base);

		expect(expected).to.be.equal(result);
	});

	it('should return a list of pokemons when listPokemons is called', async () => {
		const expected = mocks.pokemons.results;

		const result = await teamRepository.listPokemons();

		expect(expected).to.be.equal(result);
	});

	it('should return a specific pokemon when findPokemon is called', async () => {
		const expected = {
			name: mocks.pokemon1.name,
			moves: mocks.pokemon1.moves.map((move) => move.move.name),
		};

		const result = await teamRepository.findPokemon(urls.pokemon1);

		expect(JSON.stringify(expected)).to.be.equal(JSON.stringify(result));
	});
});
