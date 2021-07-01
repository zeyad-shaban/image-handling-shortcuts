let cursorX = 0
let cursorY = 0

document.onmousemove = e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
};

const getNearestImage = () => document.elementFromPoint(cursorX, cursorY);


// force downloading
function forceDownload(blob, filename) {
    var a = document.createElement('a');
    a.download = filename;
    a.href = blob;
    // For Firefox https://stackoverflow.com/a/32226068
    document.body.appendChild(a);
    a.click();
    a.remove();
}

// Current blob size limit is around 500MB for browsers
async function downloadResource(url, filename) {
    if (!filename) filename = url.replace(/^.*[\\\/]/, '');
    try {
        const response = await fetch(url, {
            headers: new Headers({
                'Origin': location.origin
            }),
            mode: 'cors'
        });
        const blob = await response.blob();

        const blobUrl = window.URL.createObjectURL(blob);
        forceDownload(blobUrl, filename);
    }
    catch (err) {
        alert("Forbidden Image, please download it MANUALLY");
        console.error(e);
    }
}
// END force downloading

const saveImageAs = () => {
    const img = getNearestImage();
    const src = img.getAttribute('src');
    downloadResource(src);
};

const copyImageAddress = () => {
    try {
        const img = getNearestImage();
        const src = img.getAttribute('src');

        const copyText = document.createElement("input");
        copyText.setAttribute('value', src);
        document.body.appendChild(copyText);

        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");

        document.body.removeChild(copyText);
        // Todo add little sound to notify user
    } catch (err) {
        window.prompt("Copy to clipboard: Ctrl+C, Enter", src);
    }
};


window.onkeydown = e => {
    const key = e.key.toLowerCase();
    const firstPart = e.shiftKey && (e.ctrlKey || e.metaKey);

    if (firstPart && key === 's') saveImageAs();
    else if (firstPart && key === 'c') copyImageAddress();
};