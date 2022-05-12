const { describe, it } = require('mocha');
const { expect } = require('chai');
const request = require('supertest');
const api = require('../../src/api');

describe('Api block', () => {
	it('should return a pattern route when an invalid url is provided', async () => {
		const response = await request(api).get('/invalid');

		const expected = { message: 'Not found.' };

		expect(response.body).to.be.deep.equal(expected);
	});

	describe('/team', () => {
		it('should return 3 pokemons', async () => {
			const response = await request(api).get('/team').expect(200);

			const expected = 3;

			expect(response.body.team.length).to.be.equal(expected);
		});

		it('should return 3 moves in each pokemon', async () => {
			const response = await request(api).get('/team').expect(200);

			const expected = 3;

			response.body.team.forEach((pokemon) => {
				expect(pokemon.moves.length).to.be.equal(expected);
			});
		});
	});
});
