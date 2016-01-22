var assert = require('assert');

function increment(a){
	return a + 1;
}

var test_cases = [];
for (var i = 0; i < 1000; i++) {
	test_cases.push(i);
}

// Run test for increment
describe('increment()', function(){
	test_cases.forEach(function (test) {
		var description = "correctly verifies that the increment of " + test;
		it(description, function(){
			assert.equal(increment(test), test + 1);
		});
	});
});