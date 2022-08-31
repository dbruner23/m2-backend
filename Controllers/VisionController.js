// Imports the Google Cloud AutoML library
import { PredictionServiceClient } from '@google-cloud/automl';
import fs from 'fs';
import axios from 'axios'
import dotenv from 'dotenv'
// import { json } from 'body-parser';

dotenv.config();
const projectId = process.env.PROJECT_ID;
const location = 'us-central1';
const modelId = process.env.MODEL_ID;

// Instantiates a client
const client = new PredictionServiceClient({
    keyFilename: "./car-image-search-key2.json"
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

        
        try {
            const [response] = await client.predict(request);
            const type = response.payload[0].displayName;
            const make = response.payload[1].displayName;
            let model = '';

            switch (make) {
                case 'Mazda':
                    model = 'cx-5';
                    break;
                case 'Toyota':
                    model = 'camry';
                    break;
                case 'Holden':
                    model = 'commodore';
                    break;
                case 'Nissan':
                    model = 'navara';
            };

            try {
                axios.get(`${process.env.CARS_API_URL}?key=${process.env.CARS_API_KEY}&make=${make}&model=${model}&format=json`)
                    .then(response => { res.send(response.data) });
            } catch (error) {
                console.log(error);
            }
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    predict()
}