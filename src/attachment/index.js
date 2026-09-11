export { default as AttachmentInput } from "./components/AttachmentInput.vue";
export { default as BaseAttachment } from "./components/BaseAttachment.vue";

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
        "gif",
        "ai",
        "svg",
        "eps",
        "ppt",
        "pptx",
        "wav",
        "mp3",
        "mp4",
        "mpg",
        "mov",
        "wmv",
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

/**
 * @param {File} file
 * @param {number} maxSize
 * @returns {boolean}
 */
function validateAttachmentSize(file, maxSize) {
    return !(maxSize && file.size > maxSize * 1024 * 1024);
}

export { validateAttachmentFormat, validateAttachmentSize };
