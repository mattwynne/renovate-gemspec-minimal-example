#!/usr/bin/env node
const { readFileSync } = require('fs')
const renovate = require(__dirname + '/renovate.json')
const regex = new RegExp(renovate.regexManagers[0].matchStrings)
const result = readFileSync('my-project.gemspec', 'utf-8').split("\n").reduce(
	(lines, line) => {
		match = regex.exec(line)
		if (!match) { return lines }
		return [...lines, [line, JSON.parse(JSON.stringify(regex.exec(line).groups))]]
	},
	[]
)
console.log(result)

