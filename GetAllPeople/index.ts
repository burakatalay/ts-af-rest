import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoDb } from '../shared/mongo';

export const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const mongo = new MongoDb();
    await mongo.connect();
    const db = mongo.getDb();

    const people = db.collection("people");
    const res = await people.find({});
    const body = await res.toArray();

    context.res = {
        status: 200,
        body
      }
    
    mongo.close();

};

//export default httpTrigger;