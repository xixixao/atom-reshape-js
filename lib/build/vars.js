'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var constDeclaration = exports.constDeclaration = function constDeclaration(id, init) {
  return {
    type: 'VariableDeclaration',
    kind: 'const',
    declarations: [{ type: 'VariableDeclarator', id: id, init: init }]
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9idWlsZC92YXJzLmpzIl0sIm5hbWVzIjpbImNvbnN0RGVjbGFyYXRpb24iLCJpZCIsImluaXQiLCJ0eXBlIiwia2luZCIsImRlY2xhcmF0aW9ucyJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFTyxJQUFNQSw4Q0FBbUIsU0FBbkJBLGdCQUFtQixDQUFDQyxFQUFELEVBQVdDLElBQVg7QUFBQSxTQUFpQztBQUMvREMsVUFBTSxxQkFEeUQ7QUFFL0RDLFVBQU0sT0FGeUQ7QUFHL0RDLGtCQUFjLENBQUMsRUFBQ0YsTUFBTSxvQkFBUCxFQUE2QkYsTUFBN0IsRUFBaUNDLFVBQWpDLEVBQUQ7QUFIaUQsR0FBakM7QUFBQSxDQUF6QiIsImZpbGUiOiJ2YXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGZsb3cgKi9cblxuZXhwb3J0IGNvbnN0IGNvbnN0RGVjbGFyYXRpb24gPSAoaWQ6IE5vZGUsIGluaXQ6IE5vZGUpOiBOb2RlID0+ICh7XG4gIHR5cGU6ICdWYXJpYWJsZURlY2xhcmF0aW9uJyxcbiAga2luZDogJ2NvbnN0JyxcbiAgZGVjbGFyYXRpb25zOiBbe3R5cGU6ICdWYXJpYWJsZURlY2xhcmF0b3InLCBpZCwgaW5pdH1dLFxufSk7XG4iXX0=