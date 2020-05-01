# Webhook Boilerplate
   This boilerplate aims to bridge the absence of a Webhook framework to support Dialogflow Virtual Agent implementation for multiple platforms by building a Webhook Template. This integration reduces time and allows developers to focus solely on the business logic

* Industry: This can be used across industries.
* ML Domain:` NLP`, ` Dialogflow `

## Problem Statement
   While creating a webhook service for Dialogflow Virtual Agent every intent that is dependent on the webhook needs to have its own fulfillment logic in order to respond to the user query. But as the number of Intents increase the code becomes unstructured and difficult to manage. 

## Solution Overview
   `Webhook Boilerplate` provides a framework for creating and managing the fulfillment service for Dialogflow Virtual Agent. The boilerplate consists of an `Intent Library` where one can create controllers for every intent. The mapping between the Intents and the Controller takes place in the `Intent mapper` thus making the service easy to manage even as the number of Intents increase. In addition to that, this can be packaged with the [Dialoglfow Fulfillment Builder](https://github.com/Quantiphi/dialogflow-fulfillment-builder) that helps to build the responses with ease for different platforms like Text, Telephony, Google Assistant, Facebook Messenger, etc

## Setup
   - Configurations (to be done in config file based on NODE_ENV)
        - Provide the platform supported by your Virtual Agent
        - Enable auth (recommended)
        - Provide PII fields to be excluded while logging


   - Commands to run 
        ```bash
        >$ npm i
        >$ export NODE_ENV="environment_name"
        >$ export USER_NAME="username" (optional)
        >$ export PASSWORD="password" (optional)
        >$ npm start

        ```

## Issues & References
* For bugs, please add an issue on [Github](https://github.com/Quantiphi/webhook-boilerplate/issues)

## License
[See LICENSE](LICENSE)