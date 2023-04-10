import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.send('Hello from Dalle')
})

router.route('/').post(async(req, res) => {
  try {
    const { prompt } = req.body;

    const aiReponse = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json'
    });

    const image = aiReponse.data.data[0].b64_json;

    res.status(200).json({ photo: image })
  } catch(err) {
    console.log(err)
    res.status(500).send(err?.reponse.data.error.message);
  }
})

export default router;