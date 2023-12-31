// #region  H E A D E R
// <copyright file="api.js" company="MicroCODE Incorporated">Copyright © 2021 MicroCODE Incorporated Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    App API
 *      Module:   api (mcode-frontend:api.js)
 *      Project:  MicroCODE Website 'App'
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     December 2021
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
 *      This module implements the MicroCODE JavaScript Class for 'api'
 *      to implement the MicroCODE 'Web App' project.
 *
 *      This module defines HTML calls into the API functions of our Server.
 *      Also known as the 'Function Hooks' for each UI Widget.
 *      This implements the Client-side, the 'FRONT-END'.
 *
 *      The goal: Fire Hydrant Award, and prepare to build LADDERS Web Services.
 *
 *      UPDATE: Reused and updated to use AXIOS and our new LOG facility.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. Starter Code Repository (Front end and API)
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
 *  24-Dec-2021   TJM-MCODE  {0001}   New module for MIT Fire Hydrant assignment.
 *  05-Mar-2022   TJM-MCODE  {0002}   Documentation updates.
 *  11-Oct-2022   TJM-MCODE  {0003}   Brought into React App version to encapsulate the API.
 *  14-Oct-2022   TJM-MCODE  {0004}   Added Roles for controlling access to HISTORY.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

// include SuperAgent for HTTP requests
import axios from 'axios';

// include our common MicroCODE Client Library
import {log, exp} from '../mcodeClient.js';

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

//    localhost:808x for development
//    https://appname.mcode.com/backend for frontend
// or http://appname.mcode.com:808x for backend
//
const API_URL = `${process.env.REACT_APP_BACKEND_URL}`;

// Axios Success Status
const RES_SUCCESS = 200;

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  F U N C T I O N S – P R I V A T E

/**
 * @func getResData
 * @desc Common execution and event logging for every API function.
 * @api private
 * @memberof api
 * @param {string} functionName name to display in the event log.
 * @param {string} url the path to the Back-End Entry Point.
 * @returns {object} the Backend Response DATA only as an JavaScript value.
 *
 * @example
 *
 *    var functionName = "Account Login";
 *    var url = `${API_URL}/account/login/${email}/${password}`;
 *    return getResData(functionName, url);
 *
 */
const getResData = async (functionName, url) =>
{
    let res = {};
    try
    {
        // the one line of code that references 'AXIOS'
        res = await axios.get(url);

        if (res.status === RES_SUCCESS)
        {
            log(`API: ${functionName} - succeeded Data: ${JSON.stringify(res.data)}`, logSource, `success`);
            return res.data;
        }
        else
        {
            const resMessage = JSON.parse(res.text);
            log(`API: ${functionName} - failed Error: ${resMessage.error}`, logSource, `error`);
            return null;
        }
    }
    catch (exception)
    {
        exp(`API: ${functionName}`, logSource, exception);
        return null;
    }
};

// #endregion

// #region  F U N C T I O N S – P U B L I C

/**
 * @namespace api
 * @desc The Application Programming Interface (API) for the App's Front-End.
 */
var api = {};

/**
 * @func create
 * @desc Creates a USER ACCOUNT on Back-End.
 * @api public
 * @memberof api
 * @param {string} username user selected display name.
 * @param {string} email user's email - UNIQUE ACCOUNT KEY.
 * @param {string} password user's password.
 * @param {string} role account type.
 * @returns {object} the Backend Response DATA only as an JavaScript value.
 *
 * @example
 *
 *    res = api.create("username", "user@company.com", "secret01", 1111.22);
 *
 */
api.create = async (username, email, password, role) =>
{
    var functionName = "Create Account";
    var url = `${API_URL}/account/create/${username}/${email}/${password}/${role}`;
    return getResData(functionName, url);
};

/**
 * @func delete
 * @desc Deletes a USER ACCOUNT on Back-End.
 * @api public
 * @memberof api
 * @param {string} username user selected display name.
 * @param {string} email user's email - UNIQUE ACCOUNT KEY.
 * @param {string} password user's password.
 * @returns {object} the Backend Response DATA only as an JavaScript value.
 *
 * @example
 *
 *    res = api.delete("username", "user@company.com", "secret01");
 *
 */
api.delete = async (username, email, password) =>
{
    var functionName = "Delete Account";
    var url = `${API_URL}/account/delete/${username}/${email}/${password}}`;
    return getResData(functionName, url);
};

/**
 * @func login
 * @desc Confirms USER CREDENTIALS on Back-End.
 * @api public
 * @memberof api
 * @param {string} email user's email - UNIQUE ACCOUNT KEY.
 * @param {string} password user's password.
 * @returns {object} the Backend Response DATA only as an JavaScript value.
 *
 * @example
 *
 *    res = api.create("username", "user@company.com", "secret01", 1111.22);
 *
 */
api.login = async (email, password) =>
{
    var functionName = "Account Login";
    var url = `${API_URL}/account/login/${email}/${password}`;
    return getResData(functionName, url);
};

/**
 * @func events
 * @desc Get all user EVENTS from Back-End.
 * @api public
 * @memberof api
 * @param {string} email user's email - UNIQUE ACCOUNT KEY.
 * @returns {object} the Backend Response DATA only as an JavaScript value.
 *
 * @example
 *
 *    res = api.events("tmcguire@mcode.com");
 *
 */
api.events = async (email) =>
{
    var functionName = "View Events";
    var url = `${API_URL}/account/events/${email}`;
    return getResData(functionName, url);
};

/**
 * @func history
 * @desc Get HISTORY from Back-End.
 * @api public
 * @memberof api
 * @returns {object} the Backend Response DATA only as an JavaScript value.
 *
 * @example
 *
 *    res = api.history();
 *
 */
api.history = async () =>
{
    var functionName = "Get History";
    var url = `${API_URL}/account/history`;
    return getResData(functionName, url);
};

// #endregion

// #region  M O D U L E - E X P O R T S

export {api};

// #endregion

// #endregion
// #endregion;