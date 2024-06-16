import express from 'express';
import 'dotenv'
const port = process.env.NODE_PORT || 3000;

const app = express();

app.get('/', (req, res) => res.send("Server is listening on port " + port))

app.listen(port, () => console.log(`server is listening on ${port}`));