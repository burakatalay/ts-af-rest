import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MongoDb } from '../shared/mongo';
import { ObjectID } from "mongodb";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { id } = req.params;

    if (!id) {
        context.res = {
        status: 400,
        body: 'The fields are required!'
        }
        return;
  }
    const mongo = new MongoDb();
    await mongo.connect();
    const db = mongo.getDb();

    const people = db.collection("people");

    try {
        await people.findOneAndDelete({ _id: new ObjectID(id) })
        mongo.close();
        context.res = {
          status: 204,
          body: "Person deleted successfully!"
        }
      } catch (error) {
        context.res = {
          status: 500,
          body: "Error Deleting Person" + id
        }
      }

};

export default httpTrigger;