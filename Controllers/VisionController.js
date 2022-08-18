import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient({
    keyFilename: "./car-image-search-78a2e9d136be.json"
})

export const getVisionData = async (req, res) => {
    const { image } = req.body;
    await client
        .labelDetection(`./public/images/${image}`)
        .then((results) => {
            const labels = results[0].labelAnnotations;

            labels.forEach((label) => console.log(label.description));
        })
        .catch((err) => {
            console.error("Error:", err)
        })
}