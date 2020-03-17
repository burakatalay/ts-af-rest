import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoDb } from '../shared/mongo';
import { ObjectID } from "mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { id } = req.params;
    const person = req.body || {};

    if (!id || !person) {
        context.res = {
        status: 400,
        body: 'Fields are required'
        }
        return;
    }

    const mongo = new MongoDb();
    await mongo.connect();
    const db = mongo.getDb();

    const people = db.collection("people");

    try {
        const updatedPerson = await people.findOneAndUpdate(
          { _id: new ObjectID(id) },
          { $set: person }
        )
    
        mongo.close()
    
        context.res = {
          status: 200,
          body: updatedPerson
        }
      } catch (error) {
        context.res = {
          status: 500,
          body: "Error updating a Person"
        }
      }

};

export default httpTrigger;