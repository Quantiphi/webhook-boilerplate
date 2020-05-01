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

const winston = require("winston");

/**
 * 
 * @param {string} level conform the severity of log [error, warn, info, verbose, debug, silly] 
 * @param {*} message message for logging
 * @param {*} label Custom label associated with each message.
 * @param {*} data log details if any
 */

const log = (level, message, label, data) => {
    let options = {
        console: {
            level: "debug",// Log only if level less than or equal to this level
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: true
        }
    };
	
    let logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.label({ label: label || "unlabeled" }),
            winston.format.timestamp(), //timestamp the message was received.
            winston.format.json() // log format
        ),
        transports: [
            new winston.transports.Console(options.console)
        ],
        exitOnError: false // do not exit on handled exceptions
    });
	
    // create a stream object with a 'write' function that will be used by `morgan`
    logger.stream = {
        write: function (msg) {
            logger.info(msg);
        }
    };

    logger.log(level, message, { logDetails: data });
};

module.exports = {
    log
};