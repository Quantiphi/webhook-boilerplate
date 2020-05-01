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

const app = require("./app");
const http = require("http");
const logger = require("./logger");
const config = require("./config")();

const server = http.createServer(app);

server.listen(config.port, (err) => {
    if (err) {
        logger.log("error", "Server error", null, { "message": err });
    } else {
        logger.log("info", `server running at  ${config.port}`, null);
    }
});