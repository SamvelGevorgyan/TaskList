const imageChangeSize = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
        let img = document.createElement('img');
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            img.onload = () => {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                let dataUrl = canvas.toDataURL("image/png");
                resolve(dataUrl)
            };
            img.src = e.target.result;
        };
        fileReader.readAsDataURL(file);
    });
};

export default imageChangeSize;
