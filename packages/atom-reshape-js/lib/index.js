'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activate = activate;
exports.deactivate = deactivate;
exports.consumeAutoreload = consumeAutoreload;

var _atom = require('atom');

var subscriptions = null;

/* globals atom */

function activate(state) {
  subscriptions = new _atom.CompositeDisposable();
  var commands = ['arrow-function-with-expression-body', 'stateless-component', 'class-component'];
  commands.forEach(function (command) {
    subscriptions.add(atom.commands.add('atom-text-editor', 'atom-reshape-js:' + command, function () {
      return formatCode(command);
    }));
  });
}

function deactivate() {
  if (subscriptions != null) {
    subscriptions.dispose();
    subscriptions = null;
  }
}

// DEV only
function consumeAutoreload(reloader) {
  reloader({
    pkg: 'atom-reshape-js',
    files: ['package.json'],
    folders: ['lib/']
  });
  console.log('atom-reshape-js reloaded');
  // atom.notifications.addSuccess('Reloaded atom-reshape-js', {
  //   detail: 'All is good',
  //   dismissable: true,
  // });
}

var formatCode = function formatCode(command) {
  var editor = atom.workspace.getActiveTextEditor();
  if (editor == null) {
    return;
  }
  var buffer = editor.getBuffer();
  var source = buffer.getText();
  var cursorIndex = buffer.characterIndexForPosition(editor.getCursorBufferPosition());
  // $FlowFixMe dynamic require is ok

  var _require = require('./commands/' + command),
      reshape = _require.reshape;

  var _require2 = require('./transform/applyReshape'),
      applyReshape = _require2.applyReshape;

  var output = applyReshape(source, cursorIndex, reshape);
  if (output == null) {
    atom.notifications.addInfo('atom-reshape-js', {
      detail: 'No change to apply, make sure you have cursor ' + 'inside code you want to reshape.',
      dismissable: true
    });
  } else {
    buffer.setTextViaDiff(output);
  }
  // let selection = editor.getSelectedText();
  // editor.setCursorBufferPosition([cursor.row + 1, cursor.column]);
};

var fromLocToAtom = function fromLocToAtom(loc) {
  return { row: loc.line - 1, column: loc.column - 1 };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhY3RpdmF0ZSIsImRlYWN0aXZhdGUiLCJjb25zdW1lQXV0b3JlbG9hZCIsInN1YnNjcmlwdGlvbnMiLCJzdGF0ZSIsImNvbW1hbmRzIiwiZm9yRWFjaCIsImFkZCIsImF0b20iLCJjb21tYW5kIiwiZm9ybWF0Q29kZSIsImRpc3Bvc2UiLCJyZWxvYWRlciIsInBrZyIsImZpbGVzIiwiZm9sZGVycyIsImNvbnNvbGUiLCJsb2ciLCJlZGl0b3IiLCJ3b3Jrc3BhY2UiLCJnZXRBY3RpdmVUZXh0RWRpdG9yIiwiYnVmZmVyIiwiZ2V0QnVmZmVyIiwic291cmNlIiwiZ2V0VGV4dCIsImN1cnNvckluZGV4IiwiY2hhcmFjdGVySW5kZXhGb3JQb3NpdGlvbiIsImdldEN1cnNvckJ1ZmZlclBvc2l0aW9uIiwicmVxdWlyZSIsInJlc2hhcGUiLCJhcHBseVJlc2hhcGUiLCJvdXRwdXQiLCJub3RpZmljYXRpb25zIiwiYWRkSW5mbyIsImRldGFpbCIsImRpc21pc3NhYmxlIiwic2V0VGV4dFZpYURpZmYiLCJmcm9tTG9jVG9BdG9tIiwicm93IiwibG9jIiwibGluZSIsImNvbHVtbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFRZ0JBLFEsR0FBQUEsUTtRQWdCQUMsVSxHQUFBQSxVO1FBUUFDLGlCLEdBQUFBLGlCOztBQTVCaEI7O0FBRUEsSUFBSUMsZ0JBQXNDLElBQTFDOztBQUpBOztBQU1PLFNBQVNILFFBQVQsQ0FBa0JJLEtBQWxCLEVBQXdDO0FBQzdDRCxrQkFBZ0IsK0JBQWhCO0FBQ0EsTUFBTUUsV0FBVyxDQUNmLHFDQURlLEVBRWYscUJBRmUsRUFHZixpQkFIZSxDQUFqQjtBQUtBQSxXQUFTQyxPQUFULENBQWlCLG1CQUFXO0FBQ3pCSCxpQkFBRCxDQUFxQkksR0FBckIsQ0FDRUMsS0FBS0gsUUFBTCxDQUFjRSxHQUFkLENBQWtCLGtCQUFsQix1QkFBeURFLE9BQXpELEVBQW9FO0FBQUEsYUFDbEVDLFdBQVdELE9BQVgsQ0FEa0U7QUFBQSxLQUFwRSxDQURGO0FBS0QsR0FORDtBQU9EOztBQUVNLFNBQVNSLFVBQVQsR0FBNEI7QUFDakMsTUFBSUUsaUJBQWlCLElBQXJCLEVBQTJCO0FBQ3pCQSxrQkFBY1EsT0FBZDtBQUNBUixvQkFBZ0IsSUFBaEI7QUFDRDtBQUNGOztBQUVEO0FBQ08sU0FBU0QsaUJBQVQsQ0FBMkJVLFFBQTNCLEVBQWdEO0FBQ3JEQSxXQUFTO0FBQ1BDLFNBQUssaUJBREU7QUFFUEMsV0FBTyxDQUFDLGNBQUQsQ0FGQTtBQUdQQyxhQUFTLENBQUMsTUFBRDtBQUhGLEdBQVQ7QUFLQUMsVUFBUUMsR0FBUixDQUFZLDBCQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7QUFFRCxJQUFNUCxhQUFhLFNBQWJBLFVBQWEsVUFBVztBQUM1QixNQUFNUSxTQUFTVixLQUFLVyxTQUFMLENBQWVDLG1CQUFmLEVBQWY7QUFDQSxNQUFJRixVQUFVLElBQWQsRUFBb0I7QUFDbEI7QUFDRDtBQUNELE1BQU1HLFNBQVNILE9BQU9JLFNBQVAsRUFBZjtBQUNBLE1BQU1DLFNBQVNGLE9BQU9HLE9BQVAsRUFBZjtBQUNBLE1BQU1DLGNBQWNKLE9BQU9LLHlCQUFQLENBQ2xCUixPQUFPUyx1QkFBUCxFQURrQixDQUFwQjtBQUdBOztBQVY0QixpQkFXVkMsd0JBQXNCbkIsT0FBdEIsQ0FYVTtBQUFBLE1BV3JCb0IsT0FYcUIsWUFXckJBLE9BWHFCOztBQUFBLGtCQVlMRCxRQUFRLDBCQUFSLENBWks7QUFBQSxNQVlyQkUsWUFacUIsYUFZckJBLFlBWnFCOztBQWE1QixNQUFNQyxTQUFTRCxhQUFhUCxNQUFiLEVBQXFCRSxXQUFyQixFQUFrQ0ksT0FBbEMsQ0FBZjtBQUNBLE1BQUlFLFVBQVUsSUFBZCxFQUFvQjtBQUNsQnZCLFNBQUt3QixhQUFMLENBQW1CQyxPQUFuQixDQUEyQixpQkFBM0IsRUFBOEM7QUFDNUNDLGNBQ0UsbURBQ0Esa0NBSDBDO0FBSTVDQyxtQkFBYTtBQUorQixLQUE5QztBQU1ELEdBUEQsTUFPTztBQUNMZCxXQUFPZSxjQUFQLENBQXNCTCxNQUF0QjtBQUNEO0FBQ0Q7QUFDQTtBQUNELENBMUJEOztBQTRCQSxJQUFNTSxnQkFBZ0IsU0FBaEJBLGFBQWdCO0FBQUEsU0FBUSxFQUFDQyxLQUFLQyxJQUFJQyxJQUFKLEdBQVcsQ0FBakIsRUFBb0JDLFFBQVFGLElBQUlFLE1BQUosR0FBYSxDQUF6QyxFQUFSO0FBQUEsQ0FBdEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG4vKiBnbG9iYWxzIGF0b20gKi9cblxuaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJztcblxubGV0IHN1YnNjcmlwdGlvbnM6ID9Db21wb3NpdGVEaXNwb3NhYmxlID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKHN0YXRlOiA/T2JqZWN0KTogdm9pZCB7XG4gIHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICBjb25zdCBjb21tYW5kcyA9IFtcbiAgICAnYXJyb3ctZnVuY3Rpb24td2l0aC1leHByZXNzaW9uLWJvZHknLFxuICAgICdzdGF0ZWxlc3MtY29tcG9uZW50JyxcbiAgICAnY2xhc3MtY29tcG9uZW50JyxcbiAgXTtcbiAgY29tbWFuZHMuZm9yRWFjaChjb21tYW5kID0+IHtcbiAgICAoc3Vic2NyaXB0aW9uczogYW55KS5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvcicsIGBhdG9tLXJlc2hhcGUtanM6JHtjb21tYW5kfWAsICgpID0+XG4gICAgICAgIGZvcm1hdENvZGUoY29tbWFuZCksXG4gICAgICApLFxuICAgICk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpOiB2b2lkIHtcbiAgaWYgKHN1YnNjcmlwdGlvbnMgIT0gbnVsbCkge1xuICAgIHN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICAgIHN1YnNjcmlwdGlvbnMgPSBudWxsO1xuICB9XG59XG5cbi8vIERFViBvbmx5XG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZUF1dG9yZWxvYWQocmVsb2FkZXI6IGFueSk6IHZvaWQge1xuICByZWxvYWRlcih7XG4gICAgcGtnOiAnYXRvbS1yZXNoYXBlLWpzJyxcbiAgICBmaWxlczogWydwYWNrYWdlLmpzb24nXSxcbiAgICBmb2xkZXJzOiBbJ2xpYi8nXSxcbiAgfSk7XG4gIGNvbnNvbGUubG9nKCdhdG9tLXJlc2hhcGUtanMgcmVsb2FkZWQnKTtcbiAgLy8gYXRvbS5ub3RpZmljYXRpb25zLmFkZFN1Y2Nlc3MoJ1JlbG9hZGVkIGF0b20tcmVzaGFwZS1qcycsIHtcbiAgLy8gICBkZXRhaWw6ICdBbGwgaXMgZ29vZCcsXG4gIC8vICAgZGlzbWlzc2FibGU6IHRydWUsXG4gIC8vIH0pO1xufVxuXG5jb25zdCBmb3JtYXRDb2RlID0gY29tbWFuZCA9PiB7XG4gIGNvbnN0IGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKTtcbiAgaWYgKGVkaXRvciA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGJ1ZmZlciA9IGVkaXRvci5nZXRCdWZmZXIoKTtcbiAgY29uc3Qgc291cmNlID0gYnVmZmVyLmdldFRleHQoKTtcbiAgY29uc3QgY3Vyc29ySW5kZXggPSBidWZmZXIuY2hhcmFjdGVySW5kZXhGb3JQb3NpdGlvbihcbiAgICBlZGl0b3IuZ2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24oKSxcbiAgKTtcbiAgLy8gJEZsb3dGaXhNZSBkeW5hbWljIHJlcXVpcmUgaXMgb2tcbiAgY29uc3Qge3Jlc2hhcGV9ID0gcmVxdWlyZShgLi9jb21tYW5kcy8ke2NvbW1hbmR9YCk7XG4gIGNvbnN0IHthcHBseVJlc2hhcGV9ID0gcmVxdWlyZSgnLi90cmFuc2Zvcm0vYXBwbHlSZXNoYXBlJyk7XG4gIGNvbnN0IG91dHB1dCA9IGFwcGx5UmVzaGFwZShzb3VyY2UsIGN1cnNvckluZGV4LCByZXNoYXBlKTtcbiAgaWYgKG91dHB1dCA9PSBudWxsKSB7XG4gICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEluZm8oJ2F0b20tcmVzaGFwZS1qcycsIHtcbiAgICAgIGRldGFpbDpcbiAgICAgICAgJ05vIGNoYW5nZSB0byBhcHBseSwgbWFrZSBzdXJlIHlvdSBoYXZlIGN1cnNvciAnICtcbiAgICAgICAgJ2luc2lkZSBjb2RlIHlvdSB3YW50IHRvIHJlc2hhcGUuJyxcbiAgICAgIGRpc21pc3NhYmxlOiB0cnVlLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGJ1ZmZlci5zZXRUZXh0VmlhRGlmZihvdXRwdXQpO1xuICB9XG4gIC8vIGxldCBzZWxlY3Rpb24gPSBlZGl0b3IuZ2V0U2VsZWN0ZWRUZXh0KCk7XG4gIC8vIGVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbihbY3Vyc29yLnJvdyArIDEsIGN1cnNvci5jb2x1bW5dKTtcbn07XG5cbmNvbnN0IGZyb21Mb2NUb0F0b20gPSBsb2MgPT4gKHtyb3c6IGxvYy5saW5lIC0gMSwgY29sdW1uOiBsb2MuY29sdW1uIC0gMX0pO1xuIl19