import { mocked } from "ts-jest/utils";
import { httpTrigger } from "./index";
const context = require('./defaultContext')
 
jest.mock("./index");

describe('#getUser() using async/await', () => {
    it('should load user data', async () => {
      const data = await httpTrigger(context);
      expect(data).toBeDefined();
    })
  })