const { describe, it, before, beforeEach, afterEach } = require('mocha');
const { expect } = require('chai');
const sinon = require('sinon');
const TeamService = require('../../src/service/teamService');
const { teamRepositoryMock, mocks } = require('../mocks/teamRepository.mock');

describe('team service block', () => {
	let teamService = {};
	let teamRepository = {};
	let sandbox = {};
	before(() => {
		teamRepository = teamRepositoryMock;
		teamService = new TeamService({
			teamRepository,
		});
	});
	beforeEach(() => {
		sandbox = sinon.createSandbox();
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should retrieve a random position from an array', () => {
		const data = [0, 1, 2, 3, 4];
		const result = teamService.getRandomPositionFromArray(data);
		expect(result).to.be.lte(data.length).and.to.be.gte(0);
	});

	it('should return multiple random items from an array', () => {
		const data = [0, 1, 2, 3, 4];

		const quantity = 3;

		const spy = sandbox.spy(
			teamService,
			teamService.getRandomPositionFromArray.name
		);

		const items = teamService.getMultipleRandomItemsFromArray(
			data,
			quantity
		);

		items.forEach((item) => expect(data.includes(item)).to.be.true);

		expect(spy.callCount).to.be.equal(quantity);
	});

	it('should return a full team with 3 random pokemons, each one with 3 moves', async () => {
		const expected = mocks.team;
		const pokemons = await teamRepository.listPokemons();

		const teamRawMocked = [pokemons[5], pokemons[8], pokemons[10]];

		sandbox
			.stub(teamService, teamService.getMultipleRandomItemsFromArray.name)
			.onFirstCall()
			.returns(teamRawMocked);

		const team = await teamService.getTeam();

		expect(JSON.stringify(team)).to.be.equal(JSON.stringify(expected));
	});
});
