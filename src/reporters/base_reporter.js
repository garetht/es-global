var BaseReporter = function(astNodeArray) {
  this.nodeArray = astNodeArray;
};

BaseReporter.prototype.report = function() {
  return this.nodeArray.map(this.reportNode)
};

BaseReporter.prototype.reportNode = function(node) {
  console.log(node);
};

module.exports = BaseReporter;

