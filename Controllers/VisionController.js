// Imports the Google Cloud AutoML library
import { PredictionServiceClient } from '@google-cloud/automl';
import fs from 'fs';

const projectId = '189820386533';
const location = 'us-central1';
const modelId = 'ICN6096907424738836480';

// Instantiates a client
const client = new PredictionServiceClient({
    keyFilename: "./car-image-search-78a2e9d136be.json"
});

export const getVisionData = async (req, res) => {
    const { image } = req.body;
   
    await client
    // Read the file content for translation.
    const content = fs.readFileSync(`./public/images/${image}`);

    async function predict() {
        // Construct request
        // score_threshold is used to filter the result
        const request = {
            name: client.modelPath(projectId, location, modelId),
            payload: {
                image: {
                    imageBytes: content,
                },
            },
        };

        const [response] = await client.predict(request);

        for (const annotationPayload of response.payload) {
            console.log(`Predicted class name: ${annotationPayload.displayName}`);
            console.log(
                `Predicted class score: ${annotationPayload.classification.score}`
            );
        }
    }

    predict()
}