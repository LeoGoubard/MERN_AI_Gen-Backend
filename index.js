import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'

import conenctDB from './mongodb/connect.js';

import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


app.get('/', async (req, res) => {
  res.send('Hello from Dall-E');
})

const startServer = async() => {

  try {
    conenctDB(process.env.MONGODB_URI);
    app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
  } catch(err) {
    console.log(err);
  }
}

startServer();