const dataURLtoBlob = fileURI => {
    let byteString;
    if (fileURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(fileURI.split(',')[1]);
    else
        byteString = unescape(fileURI.split(',')[1]);

    let mimeString = fileURI.split(',')[0].split(':')[1].split(';')[0];

    let ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
};

export default dataURLtoBlob;