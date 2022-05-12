const http = require('http');
const TeamService = require('./service/teamService');

const default_port = 3000;
const default_headers = {
	'Content-Type': 'application/json',
};

const routes = {
	'/team:get': async (request, response) => {
		const teamService = new TeamService();

		const team = await teamService.getTeam();

		response.write(JSON.stringify({ team }));
		return response.end();
	},
	default: (request, response) => {
		response.write(JSON.stringify({ message: 'Not found.' }));
		return response.end();
	},
};

const handler = function (request, response) {
	const { url, method } = request;
	const routeKey = `${url}:${method.toLowerCase()}`;
	const chosen = routes[routeKey] || routes.default;

	response.writeHead(200, default_headers);

	return chosen(request, response);
};

const app = http
	.createServer(handler)
	.listen(default_port, () => console.log(`listening at ${default_port}`));

module.exports = app;
