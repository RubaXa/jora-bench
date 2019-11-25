const {
	name: pkgName,
	version: pkgVer,
	dependencies,
} = require('./package.json');
const suite = require('./src/suite');

console.log(`${pkgName} v${pkgVer}`)
console.log(new Array(30).join('-'));

for (let [alias, ver] of Object.entries(dependencies)) {
	if (!/^npm:jora@/.test(ver)) {
		continue;
	}

	suite.add(ver.split('@').pop(), require(alias));
}

suite.run();
