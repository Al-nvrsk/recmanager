import { Quill } from "react-quill";
import QuillMarkdown from 'quilljs-markdown'
import ImageUploader from 'quill-image-uploader'
import QuillBetterImage from "@umn-latis/quill-better-image-module"
import * as Emoji from "quill-emoji";

Quill.register("modules/emoji", Emoji);

const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

const Font = Quill.import("formats/font");
Font.whitelist = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida"
];
Quill.register(Font, true);


Quill.register('modules/markdownOptions', QuillMarkdown)
Quill.register("modules/imageUploader", ImageUploader)
Quill.register("modules/betterImage", QuillBetterImage)

const toolbarOptions = {
    container: [
      ['bold', 'italic', 'underline', 'strike'],
      ['emoji'],   
    ],
    handlers: {'emoji': function() {}}
  }

export const modules = {
    toolbar:  toolbarOptions,
        // container: "#toolbar",
        
    "emoji-toolbar": true,
    "emoji-textarea": true,
    "emoji-shortname": true,
    // },
    markdownOptions: {},
    betterImage: {
        // see DefaultOptions for available options
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
    },
    imageUploader: {
        upload: (file: File) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => { // TODO: add to cloud function
                resolve(
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
                    );
                }, 3500);
            });
        },
    },
};

