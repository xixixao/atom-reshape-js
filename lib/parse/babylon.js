'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.parse = parse;
function parse(text) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var babylon = require('babylon');

  var babylonOptions = {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    plugins: ['jsx', 'flow', 'doExpressions', 'objectRestSpread', 'decorators', 'classProperties', 'exportExtensions', 'asyncGenerators', 'functionBind', 'functionSent', 'dynamicImport', 'numericSeparator', 'importMeta', 'optionalCatchBinding', 'optionalChaining', 'classPrivateProperties']
  };

  var strictMode = true;
  var lastError = null;
  var ast = null;
  while (true) {
    try {
      ast = babylon.parse(text, _extends({}, babylonOptions, { strictMode: strictMode }));
      break;
    } catch (error) {
      if (strictMode) {
        strictMode = false;
        continue;
      }
      lastError = error;
      break;
    }
  }
  if (lastError != null) {
    throw lastError;
  }
  delete ast.tokens;
  return ast;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzZS9iYWJ5bG9uLmpzIl0sIm5hbWVzIjpbInBhcnNlIiwidGV4dCIsIm9wdHMiLCJiYWJ5bG9uIiwicmVxdWlyZSIsImJhYnlsb25PcHRpb25zIiwic291cmNlVHlwZSIsImFsbG93SW1wb3J0RXhwb3J0RXZlcnl3aGVyZSIsImFsbG93UmV0dXJuT3V0c2lkZUZ1bmN0aW9uIiwicGx1Z2lucyIsInN0cmljdE1vZGUiLCJsYXN0RXJyb3IiLCJhc3QiLCJlcnJvciIsInRva2VucyJdLCJtYXBwaW5ncyI6IkFBRUE7Ozs7Ozs7O1FBSWdCQSxLLEdBQUFBLEs7QUFBVCxTQUFTQSxLQUFULENBQWVDLElBQWYsRUFBd0Q7QUFBQSxNQUEzQkMsSUFBMkIsdUVBQVgsSUFBVzs7QUFDN0QsTUFBTUMsVUFBVUMsUUFBUSxTQUFSLENBQWhCOztBQUVBLE1BQU1DLGlCQUFpQjtBQUNyQkMsZ0JBQVksUUFEUztBQUVyQkMsaUNBQTZCLElBRlI7QUFHckJDLGdDQUE0QixJQUhQO0FBSXJCQyxhQUFTLENBQ1AsS0FETyxFQUVQLE1BRk8sRUFHUCxlQUhPLEVBSVAsa0JBSk8sRUFLUCxZQUxPLEVBTVAsaUJBTk8sRUFPUCxrQkFQTyxFQVFQLGlCQVJPLEVBU1AsY0FUTyxFQVVQLGNBVk8sRUFXUCxlQVhPLEVBWVAsa0JBWk8sRUFhUCxZQWJPLEVBY1Asc0JBZE8sRUFlUCxrQkFmTyxFQWdCUCx3QkFoQk87QUFKWSxHQUF2Qjs7QUF3QkEsTUFBSUMsYUFBYSxJQUFqQjtBQUNBLE1BQUlDLFlBQVksSUFBaEI7QUFDQSxNQUFJQyxNQUFNLElBQVY7QUFDQSxTQUFPLElBQVAsRUFBYTtBQUNYLFFBQUk7QUFDRkEsWUFBTVQsUUFBUUgsS0FBUixDQUFjQyxJQUFkLGVBQXdCSSxjQUF4QixJQUF3Q0ssc0JBQXhDLElBQU47QUFDQTtBQUNELEtBSEQsQ0FHRSxPQUFPRyxLQUFQLEVBQWM7QUFDZCxVQUFJSCxVQUFKLEVBQWdCO0FBQ2RBLHFCQUFhLEtBQWI7QUFDQTtBQUNEO0FBQ0RDLGtCQUFZRSxLQUFaO0FBQ0E7QUFDRDtBQUNGO0FBQ0QsTUFBSUYsYUFBYSxJQUFqQixFQUF1QjtBQUNyQixVQUFNQSxTQUFOO0FBQ0Q7QUFDRCxTQUFRQyxHQUFELENBQVdFLE1BQWxCO0FBQ0EsU0FBT0YsR0FBUDtBQUNEIiwiZmlsZSI6ImJhYnlsb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnR5cGUgQXN0ID0gYW55O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UodGV4dDogc3RyaW5nLCBvcHRzOiA/T2JqZWN0ID0gbnVsbCk6IEFzdCB7XG4gIGNvbnN0IGJhYnlsb24gPSByZXF1aXJlKCdiYWJ5bG9uJyk7XG5cbiAgY29uc3QgYmFieWxvbk9wdGlvbnMgPSB7XG4gICAgc291cmNlVHlwZTogJ21vZHVsZScsXG4gICAgYWxsb3dJbXBvcnRFeHBvcnRFdmVyeXdoZXJlOiB0cnVlLFxuICAgIGFsbG93UmV0dXJuT3V0c2lkZUZ1bmN0aW9uOiB0cnVlLFxuICAgIHBsdWdpbnM6IFtcbiAgICAgICdqc3gnLFxuICAgICAgJ2Zsb3cnLFxuICAgICAgJ2RvRXhwcmVzc2lvbnMnLFxuICAgICAgJ29iamVjdFJlc3RTcHJlYWQnLFxuICAgICAgJ2RlY29yYXRvcnMnLFxuICAgICAgJ2NsYXNzUHJvcGVydGllcycsXG4gICAgICAnZXhwb3J0RXh0ZW5zaW9ucycsXG4gICAgICAnYXN5bmNHZW5lcmF0b3JzJyxcbiAgICAgICdmdW5jdGlvbkJpbmQnLFxuICAgICAgJ2Z1bmN0aW9uU2VudCcsXG4gICAgICAnZHluYW1pY0ltcG9ydCcsXG4gICAgICAnbnVtZXJpY1NlcGFyYXRvcicsXG4gICAgICAnaW1wb3J0TWV0YScsXG4gICAgICAnb3B0aW9uYWxDYXRjaEJpbmRpbmcnLFxuICAgICAgJ29wdGlvbmFsQ2hhaW5pbmcnLFxuICAgICAgJ2NsYXNzUHJpdmF0ZVByb3BlcnRpZXMnLFxuICAgIF0sXG4gIH07XG5cbiAgbGV0IHN0cmljdE1vZGUgPSB0cnVlO1xuICBsZXQgbGFzdEVycm9yID0gbnVsbDtcbiAgbGV0IGFzdCA9IG51bGw7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGFzdCA9IGJhYnlsb24ucGFyc2UodGV4dCwgey4uLmJhYnlsb25PcHRpb25zLCBzdHJpY3RNb2RlfSk7XG4gICAgICBicmVhaztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKHN0cmljdE1vZGUpIHtcbiAgICAgICAgc3RyaWN0TW9kZSA9IGZhbHNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGxhc3RFcnJvciA9IGVycm9yO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChsYXN0RXJyb3IgIT0gbnVsbCkge1xuICAgIHRocm93IGxhc3RFcnJvcjtcbiAgfVxuICBkZWxldGUgKGFzdDogYW55KS50b2tlbnM7XG4gIHJldHVybiBhc3Q7XG59XG4iXX0=