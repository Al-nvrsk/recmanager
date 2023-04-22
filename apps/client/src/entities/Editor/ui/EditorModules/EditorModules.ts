import { Quill } from "react-quill";
import QuillMarkdown from 'quilljs-markdown'
import ImageUploader from 'quill-image-uploader'
import QuillBetterImage from "@umn-latis/quill-better-image-module"

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

export const modules = {
    toolbar: {
        container: "#toolbar",
    },
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

