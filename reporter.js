"use strict";

var mocha = require("mocha");

var Base = mocha.reporters.Base;
var inherits = mocha.utils.inherits;
var color = Base.color,
	cursor = Base.cursor;

function AssessmentReporter(runner, options) {
	Base.call(this, runner);

	var self = this;
	var width = (Base.window.width * 0.5) | 0;
	var total = runner.total;
	var complete = 0;
	var lastN = -1;

	// default chars
	options = options || {};
	var reporterOptions = options.reporterOptions || {};

	options.open = reporterOptions.open || "[";
	options.complete = reporterOptions.complete || "▬";
	options.incomplete = reporterOptions.incomplete || Base.symbols.dot;
	options.close = reporterOptions.close || "]";
	options.verbose = reporterOptions.verbose || false;

	// tests started
	runner.on("start", function () {
		console.log();
		cursor.hide();
	});

	// tests complete
	runner.on("test end", function () {
		complete++;

		var percent = complete / total;
		var n = (width * percent) | 0;
		var i = width - n;

		if (n === lastN && !options.verbose) {
			// Don't re-render the line if it hasn't changed
			return;
		}
		lastN = n;

		cursor.CR();
		process.stdout.write("\x1B[J");
		process.stdout.write(color("progress", "  " + options.open));
		process.stdout.write(Array(n).join(options.complete));
		process.stdout.write(Array(i).join(options.incomplete));
		process.stdout.write(color("progress", options.close));
		if (options.verbose) {
			process.stdout.write(color("progress", " " + complete + " of " + total));
		}
	});

	// tests are complete, output some stats
	// and the failures if any
	runner.once("end", function () {
		cursor.show();
		var passes = self.stats.passes;
		var failures = self.stats.failures;
		var percent = Math.ceil((passes * 100) / (passes + failures));
		console.log();
		var resultColor = percent >= 75 ? "green" : "fail";
		var fmt =
			color("bright pass", " ") +
			color(resultColor, "================ pass %d % ===================");
		console.log(fmt, percent);
		console.log();
		process.exit(0);
	});
}

inherits(AssessmentReporter, Base);

module.exports = AssessmentReporter;
