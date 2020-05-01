/**
 * Copyright 2020 Quantiphi Inc. All Rights Reserved.
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
 * Configures the application based on the NODE_ENV eg: "production, qa and develop"
 * return application configurations   
 */

const loadConfig = () => {
    return {
        "port": process.env.PORT || 3000,
        "fullfillmentConfig": {
            "platformsEnabled": ["TEXT", "ACTIONS_ON_GOOGLE"]
        },
        "auth": {
            "enable": false,
            "username": process.env.USER_NAME,
            "password": process.env.PASSWORD
        },
        "logger": {
            "piiFields": []
        }
    };
};

module.exports = loadConfig;