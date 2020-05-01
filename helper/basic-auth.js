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

const config = require("./../config")();

/**
 * Authorization (basic auth) for dialogflow fulfillment request
 * @param {object} req http request 
 * @param {object} res http response
 * @param {function} next invokes the succeeding middleware/function
 */
const basicAuth = (req, res, next) => {
    const auth = req.get("authorization");
    if (req.path === "/healthcheck") {
        next();
    }
    else if (!auth) {
        res.status(401).send({ "status": 401, "message": "Unauthorized" });
    } else {
        const credentials = new Buffer.from(auth.split(" ").pop(), "base64").toString("ascii").split(":");
        if (credentials[0] === config.auth.username && credentials[1] === config.auth.password) {
            next();
        } else {
            res.status(401).send({ "status": 401, "message": "Unauthorized" });
        }
    }
};

module.exports = basicAuth;