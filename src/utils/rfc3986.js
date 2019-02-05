const fixedEncodeURIComponent = str => {
    return encodeURIComponent(str).replace(/[!'()*]/g, char => {
        return '%' + char.charCodeAt(0).toString(16);
    });
};

export default fixedEncodeURIComponent;