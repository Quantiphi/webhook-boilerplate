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

const dialogflowFullfillment = require("dialogflow-fulfillment-builder");
const config = require("./../config")();
const intentMapper = require("./intent-mapper");

/**
 * Dialogflow fullfillment controller
 * @param {object} req http request 
 * @param {object} res http response
 * @param {function} next invokes the succeeding middleware/function
 */

module.exports = async (req, res, next) => {
    try {
        const requestIntent = req.body.queryResult.intent.displayName;
        let fulfillment = new dialogflowFullfillment(config.fullfillmentConfig, req.body);
        if (intentMapper[requestIntent]) {
            await intentMapper[requestIntent](fulfillment);
        } else {
            const requiredIntent = getIntent(requestIntent);
            await require(requiredIntent)(fulfillment);
        }
        let result = fulfillment.getCompiledResponse();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

const getIntent = (name) => {
    let file = name.toLowerCase();
    file = file.replace(/ +/g, "-");
    return `./intents/${file}`;
};