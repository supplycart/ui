export { default as AttachmentInput } from "./components/AttachmentInput";
export { default as BaseAttachment } from "./components/BaseAttachment";
export { default as ButtonAttachment } from "./components/ButtonAttachment";

function validateAttachmentFormat(file, format) {
    const fname = file.name;
    let regex = null;

    // if no format is set, by default only these format are allowed
    const defaultFormat = [
        "pdf",
        "csv",
        "doc",
        "docx",
        "xls",
        "xlsx",
        "txt",
        "png",
        "jpeg",
        "jpg",
    ];

    const useFormat = format.length ? format : defaultFormat;

    for (let index = 0; index < useFormat.length; index++) {
        const element = useFormat[index];
        const temp = element.toLowerCase();

        regex = new RegExp(`(\\.${temp})$`, "i");

        if (regex.exec(fname)) {
            return true;
        }
    }

    return false;
}

function validateAttachmentSize(file, maxSize) {
    //hard limit 10mb for all files accross adam and hub
    if (maxSize > 10) {
        return false;
    }
    return !(maxSize && file.size > maxSize * 1024 * 1024);
}

export { validateAttachmentFormat, validateAttachmentSize };
