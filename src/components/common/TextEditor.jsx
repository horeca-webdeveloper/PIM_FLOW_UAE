import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";


function TextEditor() {
  return (
    <div className="editor-container">
      <CKEditor
        editor={ClassicEditor}
        
      />
    </div>
  );
}

export default TextEditor;
