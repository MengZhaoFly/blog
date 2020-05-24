var images = require("images");

images(500, 500)
    .fill(0, 255, 0)
    .save("output.jpg", {               //Save the image to a file, with the quality of 50
        quality : 50                    //保存图片到文件,图片质量为50
    });