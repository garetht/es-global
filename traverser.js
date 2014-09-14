var esprima = require('esprima'),
    escope = require('escope'),
    _ = require('lodash');

var Traverser = function(code) {
  var ast = esprima.parse(code);
  this.scopeTrees = escope.analyze(ast).scopes;
  this.globals = [];
}

Traverser.prototype.analyze = function() {
  for (var i = 0; i < this.scopeTrees.length; i++) {
    this.determineGlobals(this.scopeTrees[i]);
  }
  return this.globals;
};

Traverser.prototype.determineGlobals = function(scope) {
  var variablesInScope = this.gatherVariablesInScope(scope),
      references = scope.references;
  var referencesNotInScope = this.referencesNotInScope(variablesInScope, references);
  this.globals = this.globals.concat(referencesNotInScope);
};

Traverser.prototype.gatherVariablesInScope = function(scope) {
  var variablesInScope = [],
      nextScope = scope;

  variablesInScope = variablesInScope.concat(nextScope.variables);
  while (nextScope.upper) {
    variablesInScope = variablesInScope.concat(nextScope.variables);
    nextScope = nextScope.upper;
  }
  return variablesInScope;
};

Traverser.prototype.referencesNotInScope = function(variables, references) {
  var varNames = _.pluck(variables, 'name');

  return _.reduce(references, function(acc, ref) {
    return varNames.indexOf(ref.identifier.name) === -1 ? acc.concat(ref) : acc;
  }, []);
}

module.exports = Traverser;
