import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoDb } from '../shared/mongo';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const personData = req.body || {}

    const mongo = new MongoDb();
    await mongo.connect();
    const db = mongo.getDb();

    const people = db.collection("people")

    try {
        const person = await people.insert(personData);

        context.res = {
            status: 201,
            body: person.ops[0]
        }
        mongo.close();
    } catch (error) {
        context.res = {
            status: 500,
            body: "Error creating a new Person"
        }
    }

};

export default httpTrigger;