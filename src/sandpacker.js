import { Manager } from "smooshpack";

import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/meta";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/jsx/jsx";
import "codemirror/addon/display/panel";

export function sandpackDemo(files) {
  // Initialize preview manager
  const manager = new Manager(
    document.querySelector("#preview"),
    {
      files,
      showOpenInCodeSandbox: false
      // this can be inferred
      // template: 'create-react-app',
    },
    {
      /**
       * Location of the bundler. Defaults to `sandpack-${version}.codesandbox.io`
       */
      // bundlerURL?: string;
      /**
       * Width of iframe.
       */
      // width: 100%,
      /**
       * Height of iframe.
       */
      // height: 100%,
      /**
       * If we should skip the third step: evaluation. Useful if you only want to see
       * transpiled results
       */
      // skipEval: false,
    }
  );
  // Set up editors to update preview.
  addEditors(manager);
}

// Call `updatePreview` method when `files` change.
function onChange(manager, cm) {
  let id = null;
  cm.on("change", _ => {
    if (id !== null) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      id = null;
      const path = cm.getTextArea().dataset.path;
      manager.sandboxInfo.files[path].code = cm.getValue();
      manager.updatePreview();
    }, 200);
  });
}

function addEditors(manager) {
  const files = manager.sandboxInfo.files;
  const editors = document.getElementById("editors");
  for (const path of Object.keys(files)) {
    const editor = document.createElement("textarea");
    editor.value = files[path].code;
    editor.dataset.path = path;
    editors.appendChild(editor);
    const modeInfo = CodeMirror.findModeByFileName(path);
    const cm = CodeMirror.fromTextArea(editor, {
      lineNumbers: true,
      mode: modeInfo && modeInfo.mime
    });
    onChange(manager, cm);
    cm.addPanel(createPanel(path), { position: "top" });
  }
}

function createPanel(path) {
  const div = document.createElement("div");
  div.style.backgroundColor = "#ddd";
  div.style.padding = "2px 4px";
  div.innerHTML = `<code>${path}</code>`;
  return div;
}
