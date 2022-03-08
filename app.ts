
/**
 * Copyright 2020 Quantiphi, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 "use strict";

 import * as express from "express";
 import * as bodyParser from "body-parser";
 import * as winston from "winston";
 import * as expressWinston from "express-winston";
 import { webhookController } from "./intent-library/webhook-controller";
 import { errorHandler } from "./helper/error-handler";
 import { Config } from "./config";
 import { basicAuth } from "./helper/basic-auth";
 import * as helmet from "helmet";

 export const app = express();
 
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(helmet());
 
 let router = express.Router();
 
 router.get("/healthcheck", (req, res) => {
     res.status(200).json({ "message": "ok" });
 });
 
 router.post("/", webhookController);
 
 expressWinston.requestWhitelist.push("body");
 expressWinston.responseWhitelist.push("body");
 
 expressWinston.bodyBlacklist.push(...Config.logger.piiFields);
 
 app.use(expressWinston.logger({
     transports: [
         new winston.transports.Console()
     ],
     metaField: "apiDetails",
     format: winston.format.combine(
         winston.format.json()
     )
 }));
 

 if (Config.auth.enable) {
     app.use(basicAuth);
 }
 
 app.use("/", router);
 
 app.use(errorHandler);
 