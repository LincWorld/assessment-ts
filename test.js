import Mocha from "mocha";
import fs from "fs";
import path from "path";
import "./test/prepare";
import { AssessmentReporter } from "./test/reporter";

const mocha = new Mocha({
	reporter: AssessmentReporter
});

const part1 = path.join(__dirname, "./test/part1.test.js");

mocha.addFile(part1);

mocha.run((f) => {
	console.log("failed me", f);
});
