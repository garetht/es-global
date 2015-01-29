var BaseReporter = require("./base_reporter.js"),
    colors = require('colors');

var StandardReporter = function(nodeArray) {
  BaseReporter.call(this, nodeArray);
}

StandardReporter.prototype = Object.create(BaseReporter.prototype);
StandardReporter.prototype.constructor = StandardReporter;

StandardReporter.prototype.reportNode = function(node) {
  var id = node.identifier;
  process.stdout.write("The identifier ");
  process.stdout.write(id.name.red.bold);
  process.stdout.write(" at line ");
  process.stdout.write(id.loc.start.line.toString().blue.bold);
  process.stdout.write(":".blue.bold);
  process.stdout.write(id.loc.start.column.toString().blue.bold);
  process.stdout.write(" to line ");
  process.stdout.write(id.loc.end.line.toString().blue.bold);
  process.stdout.write(":".blue.bold);
  process.stdout.write(id.loc.end.column.toString().blue.bold);
  console.log(" is an uninitialized global.")
}

module.exports = StandardReporter;
