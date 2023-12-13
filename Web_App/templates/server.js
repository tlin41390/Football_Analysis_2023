import { MongoClient } from 'mongodb';
import express from 'express';

const app = express();
const uri = "mongodb://localhost:27017";
const port = 3000;
async function main() {
    app.listen(port, () => console.log('listening on 3000'));
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    app.get('/', async (req, res) => {
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
    
}
main().catch(console.error);
//Get all entries in the 'passing' collection exclude the _id field
// async function retrieveCollections(client){
//     const cursor = client.db("local").collection("passing").find({}).project({_id:0});
//     const results = await cursor.toArray();
// }