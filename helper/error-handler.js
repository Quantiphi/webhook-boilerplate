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

/**
 * Application error handler
 * @param {object} err application error
 * @param {object} req http request
 * @param {object} res http response
 * @param {function} next invokes the succeeding middleware/function
 */

const errorHandler = (err, req, res, next) => {
    let enviroment = process.env.NODE_ENV || "development";
    let errObj = {};
    let status = err.status || 500;

    if (res.headersSent) {
        return next(err);
    }

    errObj["stackTrace"] = (enviroment === "development") ? err.stack : "";
    errObj["status"] = status;
    errObj["details"] = err.details || "Error details not found";
    errObj["message"] = err.message || "Internal server error.";
    res.status(status).json(errObj);
};

module.exports = errorHandler;