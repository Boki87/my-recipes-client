import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";


export default (data) => {
    const editor = new EditorJS({
      logLevel: "ERROR",
      placeholder: "Start typing...",
      initialBlock: "header",
      autofocus: true,
      data,
      tools: {
        header: {
          class: Header,
          inlineToolbar: ["link"],
        },
        list: {
          class: List,
          inlineToolbar: true,
        }
      },
    });
  
    return editor;
  };