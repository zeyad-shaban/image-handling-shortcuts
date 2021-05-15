let cursorX;
let cursorY;

document.onmousemove = e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
};


const downloadFile = async (src) => {
    const filename = src.replace(/^.*[\\\/]/, '');

    var a = document.createElement('a');
    a.href = src;
    a.download = filename;
    // document.body.appendChild(a);
    a.click();
    // document.body.removeChild(a);
};


const saveImgAs = () => {
    const targetImg = document.elementFromPoint(cursorX, cursorY);
    downloadFile(targetImg.getAttribute('src'));
};

window.onkeypress = e => {
    if (e.shiftKey && e.key.toLowerCase() === 's') saveImgAs();
};