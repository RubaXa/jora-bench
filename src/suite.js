const tests = require('./tests')
const fixtureFactory = require('./fixture')

let fixture = null;
const getFixture = () => fixture;

const suite = new require('benchmark').Suite('JoraBench', {
	setup() {
		fixture = fixtureFactory();
	},

	onCycle({target}) {
		console.log(` • ${target}`);
	},

	onComplete() {
		console.log(new Array(30).join('-'));
		console.log(` ⚡️ Fastest is`, this.filter('fastest').map('name'));
	},
});

module.exports = {
	add(verion, jora) {
		console.log(` + v${verion}`);

		tests.forEach(([name, test]) => {
			suite.add(`v${verion}#${name}`, () => {
				test(jora, getFixture());
			});
		});
	},

	run() {
		console.log(new Array(30).join('-'));
		suite.run();
		console.log('');
	},
};