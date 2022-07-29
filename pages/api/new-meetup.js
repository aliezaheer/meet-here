import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // to establised on mongo cluster
    const client = await MongoClient.connect(
      "mongodb+srv://aliezaheer:rKMry7Zwx40bs9qd@cluster0.wn1kb.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    // db() method holds the data of database in our case meetups up in the link
    const db = client.db();

    // collection() method holds the multiple meetups data by collecting every single data
    const meetupsCollection = db.collection("meetups");

    // inserOnce() method used to insert one new document into this collection
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    // to close the connection with database after request done!
    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
