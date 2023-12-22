import { MongoClient } from 'mongodb';
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env_path = path.resolve(__dirname, '../../.env');

dotenv.config({ path: env_path})
const app = express();
app.use(cors());
const uri = process.env.MONGO_URI;
async function main() {
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    app.get('/passing', async (req, res) => {
        try {
            await client.connect();

            const dbo = client.db("local");
            const cursor = dbo.collection("passing").find({}, { _id: 0 });
            const result = await cursor.toArray();

            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } finally {
            await client.close();
        }

    });

    app.get('/rush', async (req, res) => {
        try {
            await client.connect();

            const dbo = client.db("local");
            const cursor = dbo.collection("rushing").find({}, { _id: 0 });
            const result = await cursor.toArray();

            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } finally {
            await client.close();
        }
    });

    app.get('/receiving', async (req, res) => {
        try {
            await client.connect();

            const dbo = client.db("local");
            const cursor = dbo.collection("receiving").find({}, { _id: 0 });
            const result = await cursor.toArray();

            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } finally {
            await client.close();
        }
    });
    
}
main().catch(console.error);