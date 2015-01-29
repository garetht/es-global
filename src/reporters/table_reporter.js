var BaseReporter = require("./base_reporter.js"),
    colors = require('colors'),
    Table = require('cli-table'),
    _ = require('lodash');

var TableReporter = function(nodeArray) {
  BaseReporter.call(this, nodeArray);
  this.padding = 4;
}

TableReporter.prototype = Object.create(BaseReporter.prototype);
TableReporter.prototype.constructor = TableReporter;

TableReporter.prototype.report = function() {
  var formattingStats = this.nodeArrayFormattingStats(),
      idWidth = formattingStats.longestIdentifier + this.padding,
      lineWidth = formattingStats.longestLineNumber + this.padding,
      table = new Table({
    head: ['Identifier'.white.bold,
           'Start'.white.bold,
           'End'.white.bold],
    colWidths: [idWidth, lineWidth, lineWidth]
  });
  this.nodeArray.forEach(function(node) {
    var id = node.identifier,
        start = id.loc.start.line + ":" + id.loc.start.column,
        end = id.loc.end.line + ":" + id.loc.end.column;
    table.push([id.name.red.bold, start.blue.bold, end.blue.bold])
  });
  console.log(table.toString())
}

TableReporter.prototype.nodeArrayFormattingStats = function() {
  // Returns statistics for a NodeArray for formatting, including
  // the longest identifier and the longest line numbers
  var longestIdentifier = _.max(_.map(this.nodeArray, function(n) {
    return n.identifier.name.length;
  })),
  longestLineNumber = _.max(_.map(this.nodeArray, function(n) {
    var end = n.identifier.loc.end;
    return end.line.toString().length + end.column.toString().length + 1; // for colon
  }));
  return {
    longestIdentifier: longestIdentifier,
    longestLineNumber: longestLineNumber
  };
}

TableReporter.prototype.reportNode = function() {
  return;
}

module.exports = TableReporter;
