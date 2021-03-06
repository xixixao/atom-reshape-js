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

  var output = void 0;
  try {
    output = applyReshape(source, cursorIndex, reshape);
  } catch (error) {
    atom.notifications.addError('atom-reshape-js', { detail: error.message });
    var position = syntaxErrorPosition(error);
    if (position) {
      editor.setCursorBufferPosition(position);
    }
    return;
  }
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

function syntaxErrorPosition(error) {
  var _ref = error.loc || {},
      line = _ref.line,
      column = _ref.column;

  return Number.isInteger(line) && Number.isInteger(column) ? [line - 1, column] : null;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJhY3RpdmF0ZSIsImRlYWN0aXZhdGUiLCJjb25zdW1lQXV0b3JlbG9hZCIsInN1YnNjcmlwdGlvbnMiLCJzdGF0ZSIsImNvbW1hbmRzIiwiZm9yRWFjaCIsImFkZCIsImF0b20iLCJjb21tYW5kIiwiZm9ybWF0Q29kZSIsImRpc3Bvc2UiLCJyZWxvYWRlciIsInBrZyIsImZpbGVzIiwiZm9sZGVycyIsImNvbnNvbGUiLCJsb2ciLCJlZGl0b3IiLCJ3b3Jrc3BhY2UiLCJnZXRBY3RpdmVUZXh0RWRpdG9yIiwiYnVmZmVyIiwiZ2V0QnVmZmVyIiwic291cmNlIiwiZ2V0VGV4dCIsImN1cnNvckluZGV4IiwiY2hhcmFjdGVySW5kZXhGb3JQb3NpdGlvbiIsImdldEN1cnNvckJ1ZmZlclBvc2l0aW9uIiwicmVxdWlyZSIsInJlc2hhcGUiLCJhcHBseVJlc2hhcGUiLCJvdXRwdXQiLCJlcnJvciIsIm5vdGlmaWNhdGlvbnMiLCJhZGRFcnJvciIsImRldGFpbCIsIm1lc3NhZ2UiLCJwb3NpdGlvbiIsInN5bnRheEVycm9yUG9zaXRpb24iLCJzZXRDdXJzb3JCdWZmZXJQb3NpdGlvbiIsImFkZEluZm8iLCJkaXNtaXNzYWJsZSIsInNldFRleHRWaWFEaWZmIiwibG9jIiwibGluZSIsImNvbHVtbiIsIk51bWJlciIsImlzSW50ZWdlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7UUFRZ0JBLFEsR0FBQUEsUTtRQWdCQUMsVSxHQUFBQSxVO1FBUUFDLGlCLEdBQUFBLGlCOztBQTVCaEI7O0FBRUEsSUFBSUMsZ0JBQXNDLElBQTFDOztBQUpBOztBQU1PLFNBQVNILFFBQVQsQ0FBa0JJLEtBQWxCLEVBQXdDO0FBQzdDRCxrQkFBZ0IsK0JBQWhCO0FBQ0EsTUFBTUUsV0FBVyxDQUNmLHFDQURlLEVBRWYscUJBRmUsRUFHZixpQkFIZSxDQUFqQjtBQUtBQSxXQUFTQyxPQUFULENBQWlCLG1CQUFXO0FBQ3pCSCxpQkFBRCxDQUFxQkksR0FBckIsQ0FDRUMsS0FBS0gsUUFBTCxDQUFjRSxHQUFkLENBQWtCLGtCQUFsQix1QkFBeURFLE9BQXpELEVBQW9FO0FBQUEsYUFDbEVDLFdBQVdELE9BQVgsQ0FEa0U7QUFBQSxLQUFwRSxDQURGO0FBS0QsR0FORDtBQU9EOztBQUVNLFNBQVNSLFVBQVQsR0FBNEI7QUFDakMsTUFBSUUsaUJBQWlCLElBQXJCLEVBQTJCO0FBQ3pCQSxrQkFBY1EsT0FBZDtBQUNBUixvQkFBZ0IsSUFBaEI7QUFDRDtBQUNGOztBQUVEO0FBQ08sU0FBU0QsaUJBQVQsQ0FBMkJVLFFBQTNCLEVBQWdEO0FBQ3JEQSxXQUFTO0FBQ1BDLFNBQUssaUJBREU7QUFFUEMsV0FBTyxDQUFDLGNBQUQsQ0FGQTtBQUdQQyxhQUFTLENBQUMsTUFBRDtBQUhGLEdBQVQ7QUFLQUMsVUFBUUMsR0FBUixDQUFZLDBCQUFaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7QUFFRCxJQUFNUCxhQUFhLFNBQWJBLFVBQWEsVUFBVztBQUM1QixNQUFNUSxTQUFTVixLQUFLVyxTQUFMLENBQWVDLG1CQUFmLEVBQWY7QUFDQSxNQUFJRixVQUFVLElBQWQsRUFBb0I7QUFDbEI7QUFDRDtBQUNELE1BQU1HLFNBQVNILE9BQU9JLFNBQVAsRUFBZjtBQUNBLE1BQU1DLFNBQVNGLE9BQU9HLE9BQVAsRUFBZjtBQUNBLE1BQU1DLGNBQWNKLE9BQU9LLHlCQUFQLENBQ2xCUixPQUFPUyx1QkFBUCxFQURrQixDQUFwQjtBQUdBOztBQVY0QixpQkFXVkMsd0JBQXNCbkIsT0FBdEIsQ0FYVTtBQUFBLE1BV3JCb0IsT0FYcUIsWUFXckJBLE9BWHFCOztBQUFBLGtCQVlMRCxRQUFRLDBCQUFSLENBWks7QUFBQSxNQVlyQkUsWUFacUIsYUFZckJBLFlBWnFCOztBQWE1QixNQUFJQyxlQUFKO0FBQ0EsTUFBSTtBQUNGQSxhQUFTRCxhQUFhUCxNQUFiLEVBQXFCRSxXQUFyQixFQUFrQ0ksT0FBbEMsQ0FBVDtBQUNELEdBRkQsQ0FFRSxPQUFPRyxLQUFQLEVBQWM7QUFDZHhCLFNBQUt5QixhQUFMLENBQW1CQyxRQUFuQixDQUE0QixpQkFBNUIsRUFBK0MsRUFBQ0MsUUFBUUgsTUFBTUksT0FBZixFQUEvQztBQUNBLFFBQU1DLFdBQVdDLG9CQUFvQk4sS0FBcEIsQ0FBakI7QUFDQSxRQUFJSyxRQUFKLEVBQWM7QUFDWm5CLGFBQU9xQix1QkFBUCxDQUErQkYsUUFBL0I7QUFDRDtBQUNEO0FBQ0Q7QUFDRCxNQUFJTixVQUFVLElBQWQsRUFBb0I7QUFDbEJ2QixTQUFLeUIsYUFBTCxDQUFtQk8sT0FBbkIsQ0FBMkIsaUJBQTNCLEVBQThDO0FBQzVDTCxjQUNFLG1EQUNBLGtDQUgwQztBQUk1Q00sbUJBQWE7QUFKK0IsS0FBOUM7QUFNRCxHQVBELE1BT087QUFDTHBCLFdBQU9xQixjQUFQLENBQXNCWCxNQUF0QjtBQUNEO0FBQ0Q7QUFDQTtBQUNELENBcENEOztBQXNDQSxTQUFTTyxtQkFBVCxDQUE2Qk4sS0FBN0IsRUFBOEQ7QUFBQSxhQUNyQ0EsTUFBTVcsR0FBTixJQUFhLEVBRHdCO0FBQUEsTUFDckRDLElBRHFELFFBQ3JEQSxJQURxRDtBQUFBLE1BQy9DQyxNQUQrQyxRQUMvQ0EsTUFEK0M7O0FBRTVELFNBQU9DLE9BQU9DLFNBQVAsQ0FBaUJILElBQWpCLEtBQTBCRSxPQUFPQyxTQUFQLENBQWlCRixNQUFqQixDQUExQixHQUNILENBQUNELE9BQU8sQ0FBUixFQUFXQyxNQUFYLENBREcsR0FFSCxJQUZKO0FBR0QiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAZmxvdyAqL1xuXG4vKiBnbG9iYWxzIGF0b20gKi9cblxuaW1wb3J0IHtDb21wb3NpdGVEaXNwb3NhYmxlfSBmcm9tICdhdG9tJztcblxubGV0IHN1YnNjcmlwdGlvbnM6ID9Db21wb3NpdGVEaXNwb3NhYmxlID0gbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKHN0YXRlOiA/T2JqZWN0KTogdm9pZCB7XG4gIHN1YnNjcmlwdGlvbnMgPSBuZXcgQ29tcG9zaXRlRGlzcG9zYWJsZSgpO1xuICBjb25zdCBjb21tYW5kcyA9IFtcbiAgICAnYXJyb3ctZnVuY3Rpb24td2l0aC1leHByZXNzaW9uLWJvZHknLFxuICAgICdzdGF0ZWxlc3MtY29tcG9uZW50JyxcbiAgICAnY2xhc3MtY29tcG9uZW50JyxcbiAgXTtcbiAgY29tbWFuZHMuZm9yRWFjaChjb21tYW5kID0+IHtcbiAgICAoc3Vic2NyaXB0aW9uczogYW55KS5hZGQoXG4gICAgICBhdG9tLmNvbW1hbmRzLmFkZCgnYXRvbS10ZXh0LWVkaXRvcicsIGBhdG9tLXJlc2hhcGUtanM6JHtjb21tYW5kfWAsICgpID0+XG4gICAgICAgIGZvcm1hdENvZGUoY29tbWFuZCksXG4gICAgICApLFxuICAgICk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpOiB2b2lkIHtcbiAgaWYgKHN1YnNjcmlwdGlvbnMgIT0gbnVsbCkge1xuICAgIHN1YnNjcmlwdGlvbnMuZGlzcG9zZSgpO1xuICAgIHN1YnNjcmlwdGlvbnMgPSBudWxsO1xuICB9XG59XG5cbi8vIERFViBvbmx5XG5leHBvcnQgZnVuY3Rpb24gY29uc3VtZUF1dG9yZWxvYWQocmVsb2FkZXI6IGFueSk6IHZvaWQge1xuICByZWxvYWRlcih7XG4gICAgcGtnOiAnYXRvbS1yZXNoYXBlLWpzJyxcbiAgICBmaWxlczogWydwYWNrYWdlLmpzb24nXSxcbiAgICBmb2xkZXJzOiBbJ2xpYi8nXSxcbiAgfSk7XG4gIGNvbnNvbGUubG9nKCdhdG9tLXJlc2hhcGUtanMgcmVsb2FkZWQnKTtcbiAgLy8gYXRvbS5ub3RpZmljYXRpb25zLmFkZFN1Y2Nlc3MoJ1JlbG9hZGVkIGF0b20tcmVzaGFwZS1qcycsIHtcbiAgLy8gICBkZXRhaWw6ICdBbGwgaXMgZ29vZCcsXG4gIC8vICAgZGlzbWlzc2FibGU6IHRydWUsXG4gIC8vIH0pO1xufVxuXG5jb25zdCBmb3JtYXRDb2RlID0gY29tbWFuZCA9PiB7XG4gIGNvbnN0IGVkaXRvciA9IGF0b20ud29ya3NwYWNlLmdldEFjdGl2ZVRleHRFZGl0b3IoKTtcbiAgaWYgKGVkaXRvciA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGJ1ZmZlciA9IGVkaXRvci5nZXRCdWZmZXIoKTtcbiAgY29uc3Qgc291cmNlID0gYnVmZmVyLmdldFRleHQoKTtcbiAgY29uc3QgY3Vyc29ySW5kZXggPSBidWZmZXIuY2hhcmFjdGVySW5kZXhGb3JQb3NpdGlvbihcbiAgICBlZGl0b3IuZ2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24oKSxcbiAgKTtcbiAgLy8gJEZsb3dGaXhNZSBkeW5hbWljIHJlcXVpcmUgaXMgb2tcbiAgY29uc3Qge3Jlc2hhcGV9ID0gcmVxdWlyZShgLi9jb21tYW5kcy8ke2NvbW1hbmR9YCk7XG4gIGNvbnN0IHthcHBseVJlc2hhcGV9ID0gcmVxdWlyZSgnLi90cmFuc2Zvcm0vYXBwbHlSZXNoYXBlJyk7XG4gIGxldCBvdXRwdXQ7XG4gIHRyeSB7XG4gICAgb3V0cHV0ID0gYXBwbHlSZXNoYXBlKHNvdXJjZSwgY3Vyc29ySW5kZXgsIHJlc2hhcGUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcignYXRvbS1yZXNoYXBlLWpzJywge2RldGFpbDogZXJyb3IubWVzc2FnZX0pO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gc3ludGF4RXJyb3JQb3NpdGlvbihlcnJvcik7XG4gICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICBlZGl0b3Iuc2V0Q3Vyc29yQnVmZmVyUG9zaXRpb24ocG9zaXRpb24pO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKG91dHB1dCA9PSBudWxsKSB7XG4gICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEluZm8oJ2F0b20tcmVzaGFwZS1qcycsIHtcbiAgICAgIGRldGFpbDpcbiAgICAgICAgJ05vIGNoYW5nZSB0byBhcHBseSwgbWFrZSBzdXJlIHlvdSBoYXZlIGN1cnNvciAnICtcbiAgICAgICAgJ2luc2lkZSBjb2RlIHlvdSB3YW50IHRvIHJlc2hhcGUuJyxcbiAgICAgIGRpc21pc3NhYmxlOiB0cnVlLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGJ1ZmZlci5zZXRUZXh0VmlhRGlmZihvdXRwdXQpO1xuICB9XG4gIC8vIGxldCBzZWxlY3Rpb24gPSBlZGl0b3IuZ2V0U2VsZWN0ZWRUZXh0KCk7XG4gIC8vIGVkaXRvci5zZXRDdXJzb3JCdWZmZXJQb3NpdGlvbihbY3Vyc29yLnJvdyArIDEsIGN1cnNvci5jb2x1bW5dKTtcbn07XG5cbmZ1bmN0aW9uIHN5bnRheEVycm9yUG9zaXRpb24oZXJyb3I6IEVycm9yKTogP1tudW1iZXIsIG51bWJlcl0ge1xuICBjb25zdCB7bGluZSwgY29sdW1ufSA9IGVycm9yLmxvYyB8fCB7fTtcbiAgcmV0dXJuIE51bWJlci5pc0ludGVnZXIobGluZSkgJiYgTnVtYmVyLmlzSW50ZWdlcihjb2x1bW4pXG4gICAgPyBbbGluZSAtIDEsIGNvbHVtbl1cbiAgICA6IG51bGw7XG59XG4iXX0=