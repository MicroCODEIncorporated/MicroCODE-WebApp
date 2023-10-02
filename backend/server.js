// #region  H E A D E R
// <copyright file="server.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE
 *      Module:   index (.\backend\server.js)
 *      Project:  MicroCODE 3-Tier MERN App 'MicroCODE'
 *      Customer: MicroCODE (Internal)
 *      Creator:  MicroCODE Incorporated
 *      Date:     October 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2021,2022 MicroCODE Incorporated
 *
 *      This software and related materials are the property of
 *      MicroCODE Incorporated and contain confidential and proprietary
 *      information. This software and related materials shall not be
 *      duplicated, disclosed to others, or used in any way without the
 *      written of MicroCODE Incorported.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the MicroCODE JavaScript Class for `backend\server`
 *      to implement the MicroCODE Website refactoring to App.
 *
 *      This implements the Server-side, the `BACK-END`.
 *
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. Starter Code Repository (Front-End and API)
 *         https://github.com/1125f16/mcode
 *      2. Starter Code Repository (Simple database)
 *         https://github.com/1125f16/littledb
 *         This is a repository that will get you familiar with the process of storing data with the lowdb package.
 *
 *
 *      VIDEOS:
 *      -------
 *
 *      1. Three Tiers - HTTP Server (Links to an external site.)
 *         https://youtu.be/TL9GyGWqjp4
 *      2. Three Tiers - Data Store (Links to an external site.)
 *         https://youtu.be/yM8nFgkeD-c
 *      3. Three Tiers - HTTP Server + Data Store (Links to an external site.)
 *         https://youtu.be/E9VJ2de654M
 *      4. Three Tiers - HTTP Server + Data Store + HTML Client
 *         https://youtu.be/vcXdW4V8GNs
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:    Description:
 *
 *  25-Aug-2022   TJM-MCODE  {0001}   Copied from 'Fire Hydrant' project to move React App to MERN Architecture.
 *  14-Oct-2022   TJM-MCODE  {0002}   Added Roles for controlling access to HISTORY.
 *  15-Oct-2022   TJM-MCODE  {0003}   Added 'Send Money' feature.
 *  17-Oct-2022   TJM-MCODE  {0004}   Fix SEND MONEY by sequencing the DAL Promsises with 'Promise.all()'
 *  17-Oct-2022   TJM-MCODE  {0005}   Added APPLE ID Sign-In - https://app.mcode.com/backend/account/appleid/notification
 *
 *
 *
 */
"use strict";

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

/**
 * @namespace mcodeServer
 * @desc MicroCODE's shared library for constructing the Back-End of a 3-Tier MERN Apps.
 */

/**
 * @namespace server
 * @desc App's Express Route Handler (ERH).
 */

// #region  C O N S T A N T S

//    localhost:8081 for development
//    http://45.55.107.145/backend for staging
//    https://app.mcode.com/backend for frontend production
// or https://app.mcode.com:8081 for backend production
//
const APP_PORT = parseInt(`${process.env.APP_BACKEND_PORT}`);
const APP_URL = `${process.env.APP_SUBDOMAIN}:${APP_PORT}`;

// #endregion

// #region  P R I V A T E   F I E L D S

/*
 * SERVER: FILE SYSTEM, STORAGE, and STRUCTURES
 * --------------------------------------------
 * These define the Server it's File System, Storage mechanisms, and stored Objects/Structures.
 *
 */

// load ExpressJS
const express = require(`express`);

// allow Cross Origin Resource Sharing (for development only)
const cors = require(`cors`);

// support .env file variables -- this bring the .env file variables into the `process.env` object
require(`dotenv`).config();

// instantiate ExpressJS
const app = express();

// load Faker to generate test data
//* const faker = require(`faker`);

// include our common MicroCODE Server Library
var mcode = require(`./src/mcodeServer.js`);

// load our Data Abstraction Layer (DAL)
const dal = require(`./src/dal/dal.js`);

// load our DB Scheme and Constructors
const model = require(`./src/models/account.model.js`);

// get our current file name for logging events
var path = require(`path`);
var logSource = path.basename(__filename);

// Required data store structure
/*
{
    account:
    {
        name     : "",
        email    : "",
        password : "",
        role     : "",
        created  : "YYYY-MM-DD HH:MM:SS.mmm"
        event    : [ ]
    }

    event:
    {
        type      : <'CREATE', 'LOGIN', 'LOGOUT'... >
        data
        {
            name1 : value1;
            name2 : value2;
            name3 : value3;
        }
        timestamp : "YYYY-MM-DD HH:MM:SS.mmm"
    }
}
*/
// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

// #endregion

// #region  A P I – P U B L I C

/*
 * API: INITIALIZATION
 * -------------------
 * This instantiates our Application Programming Interface (API)
 * and listens for Client requests.
 *
 */

// configure express to serve static files from public directory
app.use(express.static(`public`));

// configure CORS to share resources -- THIS MUST COME BEFORE ROUTES
app.use(cors());

// Startup Server
// Define a LISTENER with a simple Callback function that logs a response in the console...
app.listen(APP_PORT, function ()
{
    // show that our listener is alive
    mcode.log(`SERVER -- Running on Port: ${APP_PORT}!  Path: ${APP_URL}`, logSource, `success`);
});

/*
 * API: UI ROUTES
 * --------------
 * These make up our Application Programming Interface (API)
 * and correspond to the UI Widgets.
 *
 */

/**
 * Define a ROUTE - from Browser to Server.
 *
 * `/` = ROOT
 * `req` = REQUEST
 * `res` = RESPONSE
 *
 */
app.get(`/`, function (req, res)
{
    // a simple response to a request
    res.send("MicroCODE Server is online. [NOTE: This should never be seen if the React App is being served properly.]");
});

app.get(`/test`, function (req, res)
{
    // a simple response to a request
    res.send("MicroCODE Server was test scucessful. [NOTE: Changes to this file are *not* dynamic, they are loaded at Page Display.]");
});

/**
 * @func appleid
 * @memberof server
 * @desc Responds to Apple Id notifications.
 * @api public
 * @returns {object} response to Apple
 * @returns {string} 401 status with error message if unsucessful
 */
app.post(`/account/appleid/notification`, async function (req, res)
{
    mcode.log(`Apple Request: ${req}`, logSource, `wait`);

    const user = await getAppleUserId(req.body.id_token);
    res.redirect(303, 'https://app.mcode.com/app?user=${JSON.stringify(req.body.id_token)}');

    // respond to Apple Id requests
    res.send("Response for Apple Id requests...");
});


/**
 * @func create
 * @memberof server
 * @desc Creates account route.
 * @api public
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/account/create/:username/:email/:password/:role`, function (req, res)
{
    mcode.log(`CREATE -- Creating Account for ${req.params.email}`, logSource, `info`);

    // Check for existing Account from Database
    dal.findAccount(req.params.email)
        .then((res_create) =>
        {
            if (res_create)
            {
                const find_msg = `CREATE -- Create Account FAILED, account exists for: ${req.params.email}`;
                mcode.log(find_msg, logSource, `error`);
                res.status(401).json({error: find_msg});
            }
            else
            {
                let account = model.accountRecord(req.params.username, req.params.email, req.params.password, req.params.role);

                dal.createAccount(account)
                    .then(() =>
                    {
                        mcode.log(`CREATE -- Successfully created User Account: ${account.email}`, logSource, `success`);
                        res.send(account);
                    })
                    .catch((exp_create) =>
                    {
                        const exp_msg = mcode.exp(`CREATE -- dal.createAccount EXCEPTION.`, logSource, exp_create);
                        res.status(401).json({error: exp_msg});
                    })
                    .finally(() =>
                    {

                    });
            }
        })
        .catch((exp_create) =>
        {
            res.status(401).json({error: exp_create});
        })
        .finally(() =>
        {

        });
});

/**
 * @func delete
 * @memberof server
 * @desc Delete user account.
 * @api public
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/account/delete/:username/:email/:password`, function (req, res)
{
    mcode.log(`DELETE -- Deleting Account for ${req.params.email}`, logSource, `info`);

    // Check for existing Account from Database
    dal.findAccount(req.params.email)
        .then((res_create) =>
        {
            if (!res_create)
            {
                const find_msg = `DELETE -- Delete Account FAILED, account does not exists for: ${req.params.email}`;
                mcode.log(find_msg, logSource, `error`);
                res.status(401).json({error: find_msg});
            }
            else
            {
                let account = model.accountRecord(req.params.username, req.params.email, req.params.password, 0);

                dal.deleteAccount(account)
                    .then(() =>
                    {
                        mcode.log(`DELETE -- Successfully delete User Account: ${account.email}`, logSource, `success`);
                        res.send(account);
                    })
                    .catch((exp_create) =>
                    {
                        const exp_msg = mcode.exp(`DELETE -- dal.deleteAccount EXCEPTION.`, logSource, exp_create);
                        res.status(401).json({error: exp_msg});
                    })
                    .finally(() =>
                    {

                    });
            }
        })
        .catch((exp_create) =>
        {
            const exp_msg = mcode.exp(`DELETE -- dal.findAccount EXCEPTION.`, logSource, exp_create);
            res.status(401).json({error: exp_create});
        })
        .finally(() =>
        {

        });
});

/**
 * @func login
 * @memberof server
 * @desc Confirms user's credentials.
 * @api public
 * @returns {object} account object if successful
 * @returns {string} 401 status with error message if unsucessful
 */
app.get(`/account/login/:email/:password`, function (req, res)
{
    mcode.log(`LOGIN -- Logging into Account of ${req.params.email}`, logSource, `info`);

    // Get Account from Database
    dal.findAccount(req.params.email)
        .then((res_create) =>
        {
            if (!res_create)
            {
                const find_msg = `LOGIN -- Login to Account FAILED, account does not exists for: ${req.params.email}`;
                mcode.log(find_msg, logSource, `error`);
                res.status(401).json({error: find_msg});
            }
            else
            {
                mcode.log(`LOGIN -- Login to Account SUCCEEDED with ${res_create.email}`, logSource, `success`);
                res.send(res_create);
            }
        })
        .catch((exp_create) =>
        {
            const exp_msg = mcode.exp(`LOGIN -- dal.findAccount EXCEPTION.`, logSource, exp_create);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        });
});

/**
 * @func events
 * @memberof server
 * @desc Returns events for a specific account.
 * @api public
 * @returns {object} accounts data object if successful
 */
app.get(`/account/events/:email`, function (req, res)
{
    mcode.log(`EVENTS -- Returning Account Events for ${req.params.email}`, logSource, `info`);

    // returns events from the database
    dal.getAccount(req.params.email)
        .then((res_events) =>
        {
            mcode.log(`EVENTS -- Number of Account Events: ${res_events.log.length}`, logSource, `info`);
            res.send(res_events);
        })
        .catch((exp_events) =>
        {
            const exp_msg = mcode.exp(`EVENTS -- dal.getAccount EXCEPTION.`, logSource, exp_events);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        });
});

/**
 * @func History
 * @memberof server
 * @desc Returns all data for all accounts.
 * @api public
 * @returns {object} accounts data object if successful
 */
app.get(`/account/history`, function (req, res)
{
    mcode.log(`HISTORY -- Returning all Account Data...`, logSource, `info`);

    // returns all data in the database
    dal.getAccounts()
        .then((res_history) =>
        {
            mcode.log(`HISTORY -- Get data succeeded, number = ${res_history.length}.`, logSource, `success`);
            // debug only --- mcode.log(`HISTORY -- Users: ${JSON.stringify(res_history)}`, logSource, `info`);
            res.send(res_history);
        })
        .catch((exp_history) =>
        {
            const exp_msg = mcode.exp(`HISTORY -- dal.getAccounts EXCEPTION.`, logSource, exp_history);
            res.status(401).json({error: exp_msg});
        })
        .finally(() =>
        {

        });
});

// #endregion

// #endregion
// #endregion