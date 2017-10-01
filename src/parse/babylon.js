/* @flow */

'use strict';

type Ast = any;

export function parse(text: string, opts: ?Object = null): Ast {
  const babylon = require('babylon');

  const babylonOptions = {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    allowReturnOutsideFunction: true,
    plugins: [
      'jsx',
      'flow',
      'doExpressions',
      'objectRestSpread',
      'decorators',
      'classProperties',
      'exportExtensions',
      'asyncGenerators',
      'functionBind',
      'functionSent',
      'dynamicImport',
      'numericSeparator',
      'importMeta',
      'optionalCatchBinding',
      'optionalChaining',
      'classPrivateProperties',
    ],
  };

  let strictMode = true;
  let lastError = null;
  let ast = null;
  while (true) {
    try {
      ast = babylon.parse(text, {...babylonOptions, strictMode});
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
  delete (ast: any).tokens;
  return ast;
}
