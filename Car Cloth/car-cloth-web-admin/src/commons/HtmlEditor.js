import {Editor} from "@tinymce/tinymce-react";
// TinyMCE so the global var exists
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce';

// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin.min.css';

// importing the plugin js.
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';

const HtmlEditor = ({id, content, handleChangeContent}) => {
    return (
            <Editor
                id={id}
                init={{
                    skin: false,
                    content_css: false,
                    height: 500,
                    selector: 'textarea',
                    toolbar_mode: 'scrolling',
                    menubar: true,
                    plugins: ['image link '],

                }}
                value={content}
                onEditorChange={handleChangeContent}
            />
    )
}

export default HtmlEditor
