var BaseReporter = require("./base_reporter.js"),
    colors = require('colors'),
    Table = require('cli-table');

var TableReporter = function(nodeArray) {
  BaseReporter.call(this, nodeArray);
}

TableReporter.prototype = Object.create(BaseReporter.prototype);
TableReporter.prototype.constructor = TableReporter;

TableReporter.prototype.report = function() {
  var table = new Table({
    head: ['Identifier'.white.bold,
           'Start'.white.bold,
           'End'.white.bold],
    colWidths: [20, 10, 10]
  });
  this.nodeArray.forEach(function(node) {
    var id = node.identifier,
        start = id.loc.start.line + ":" + id.loc.start.column,
        end = id.loc.end.line + ":" + id.loc.end.column;
    table.push([id.name.red.bold, start.blue.bold, end.blue.bold])
  });
  console.log(table.toString())
}

TableReporter.prototype.reportNode = function() {
  return;
}

module.exports = TableReporter;
