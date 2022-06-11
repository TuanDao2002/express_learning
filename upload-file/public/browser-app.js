const url = "/api/v1/file";
const fileFormDOM = document.querySelector(".file-form");
const imageInputDOM = document.querySelector("#image");
const containerDOM = document.querySelector(".container");
var imageValue;

imageInputDOM.addEventListener("change", async (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
        const {
            data: {
                image: { src },
            },
        } = await axios.post(`${url}/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        imageValue = src;
        // console.log(imageValue);
    } catch (error) {
        imageValue = null;
        console.log(error);
    }
});

fileFormDOM.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("add image");
    if (imageValue === null || imageValue === undefined) {
        containerDOM.innerHTML = `<h1>Image is not uploaded yet !!!</h1>`;
        return;
    }
    containerDOM.innerHTML = `<img src="${imageValue}"/>`;
});
