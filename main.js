import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient({
    keyFilename: "./car-image-search-78a2e9d136be.json"
})

client
    .labelDetection("./2021-nissan-frontier-crew-cab-4x4-sv-auto-angular-front-exterior-view_100785155_l.jpeg")
    .then((results) => {
        const labels = results[0].labelAnnotations;
        
        console.log("Labels:");
    labels.forEach((label) => console.log(label.description));

})
    .catch((err) => {
        console.error("Error:", err)
})
     