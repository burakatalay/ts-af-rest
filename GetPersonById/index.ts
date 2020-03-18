import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoDb } from '../shared/mongo';
import { ObjectID } from "mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { id } = req.params;

    if (!id) {
        context.res = {
        status: 400,
        body: "Please enter a valid person ID"
        }
        return;
    }

    const mongo = new MongoDb();
    await mongo.connect();
    const db = mongo.getDb();

    const people = db.collection("people");

    try {

        //const body = await people.findOne( {_id: new ObjectID(id)});   
        const res = await people.find({});
        const body = await res.toArray();
        mongo.close();
        context.res = {
            status: 200, 
            body
        }
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error getting person by ID"
        }
    }

};

export default httpTrigger;