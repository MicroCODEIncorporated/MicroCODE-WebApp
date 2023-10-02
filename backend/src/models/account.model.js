// #region  H E A D E R
// <copyright file="account.model.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Common User Model
 *      Module:   Modules (./account.model.js)
 *      Project:  MicroCODE 3-Tire MERN `Web App`
 *      Customer: MicroCODE (Internal)
 *      Creator:  MicroCODE Incorporated
 *      Date:     October 2022
 *      Author:   Timothy J McGuire
 *
 *      Designed and Coded: 2022 MicroCODE Incorporated
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
 *      This module implements the App Account Model.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1.  MIT xPRO MERN Examples
 *          https://student.emeritus.org/courses/3291/files/2554233/download?wrap=1
 *
 *      2.  MongoDB Schema Design Best Practices
 *          https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/
 *
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      --------------------
 *
 *      1. ...
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:      Description:
 *
 *  03-Oct-2022   TJM-MCODE  {0001}     New module for common reusable MERN Template `AppName`.
 *  14-Oct-2022   TJM-MCODE  {0002}     Added Roles for controlling access to ALL DATA.
 *
 *
 */
"use strict";

const mongoose = require(`mongoose`);

// include our common MicroCODE Server Library
var mcode = require(`../mcodeServer.js`);

// #endregion
// #endregion
// #endregion

// #region  J A V A S C R I P T
// #region  C O D E   F O L D I N G

// #region  C O N S T A N T S

const eventSchema = new mongoose.Schema(
    {
        type: {
            enum: [`CREATE`, `LOGIN`, `LOGOUT`, `CLOSE`, `UPLOAD`, `CLONE`, `RENAME`, `DELETE`, `COMPARE`, `EMAIL`, `TEXT`, `DOWNLOAD`],
        },
        data: {
            type: String,
        },
        timestamp: {
            type: Number,
        }
    });

const accountSchema = new mongoose.Schema(
    {
        username: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        role: {
            enum: [`ENGINEER`, `MANAGER`, `DEVELOPER`],
        },
        created: {
            type: String,
        },
        log: {
            type: [eventSchema],
        }
    });

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  M E T H O D S – P U B L I C

/**
 * @func accountRecord
 * @desc Create a User Account record.
 * @spai private
 * @param {string} username selected by the user.
 * @param {string} email email address supplied by the user.
 * @param {string} password set by the user.
 * @param {string} role what type of account.
 * @returns {object} newly created account object with its initial event.
 */
var accountRecord = function (username, email, password, role)
{
    let account =
    {
        username: username,
        email: email,
        password: password,
        role: role,
        created: mcode.timeStamp(),
        log: []
    };

    // log event... (optional)
    account.log.push(eventRecord(`CREATE`, `username: ${username}, role: ${role}`));

    return account;
};

/**
 * @func eventRecord
 * @desc Create an Account Transaction object.
 * @api private
 * @param {string} event One of: `CREATE`, `LOGIN`, `LOGOUT`, `CLOSE`...
 * @param {string} valuePairs a string of `member: value` pairs.
 * @returns {object} newly created event object.
 */
var eventRecord = function (event, valuePairs)
{
    let splitPairs = {};
    valuePairs.split(`,`).forEach(pair =>
    {
        let [key, value] = pair.split(`:`).map(str => str.trim());
        splitPairs[key] = value;
    });

    let eventRecord = {
        type: event,
        data: splitPairs,
        timeStamp: mcode.timeStamp()
    };

    return eventRecord;
};


// #endregion

// #region  M E T H O D - E X P O R T S

const Account = mongoose.model(`Account`, accountSchema);

module.exports = {Account, accountRecord, eventRecord};

// #endregion

// #endregion
// #endregion