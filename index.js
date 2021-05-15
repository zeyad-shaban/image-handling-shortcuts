let cursorX;
let cursorY;

document.onmousemove = e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
};

const getNearestImage = () => document.elementFromPoint(cursorX, cursorY);


const saveImageAs = () => {
    const img = getNearestImage();
    const src = img.getAttribute('src');
    const imgName = src.replace(/^.*[\\\/]/, '');

    var a = document.createElement('a');
    a.href = src;
    a.download = imgName;
    a.click();
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


window.onkeypress = e => {
    const key = e.key.toLowerCase();
    const firstPart = e.shiftKey && (e.ctrlKey || e.metaKey);

    if (firstPart && key === 's') saveImageAs();
    else if (firstPart && key === 'c') copyImageAddress();
};