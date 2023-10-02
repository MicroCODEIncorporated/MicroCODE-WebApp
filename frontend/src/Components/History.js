// #region  H E A D E R
// <copyright file="History.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE React App History
 *      Module:   Modules (./History.js)
 *      Project:  MicroCODE Web App React App
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     June 2022
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
 *      This module implements the MicroCODE's Web App React Login.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *
 *
 *      DEMONSTRATION VIDEOS:
 *      ---------------------
 *
 *      1. ...
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:     Description:
 *
 *  02-Jun-2022   TJM-MCODE  {0001}    New module implementing the Web App Context Display (History).
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from './AppContext';
import AppCard from './AppCard';

// include the Back-End API
import {api} from '../api/api.js';

// include our common MicroCODE Client Library
import {log, simplifyText} from '../mcodeClient.js';

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

/**
 * @func History
 * @memberof app
 * @desc returns all events from all our Web App Accounts.
 * @api public
 * @param {nil} no properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
 * @example
 *
 *      History();
 *
 */
function History()
{
    // validate PROPS input(s)

    // initialize STATE and define accessors...
    const [accounts, setAccounts] = useState(null);
    const [needInput, setNeedInput] = useState(true);

    // access CONTEXT for reference...
    const ctx = useContext(AppContext);

    ctx.RevealAccounts = false;

    // #region  P R I V A T E   F U N C T I O N S

    // useEffect with an empty dependency array
    useEffect(() =>
    {
        (async () =>
        {
            log(`[HISTORY] Getting Accounts from DB...`, logSource, `info`);
            let accounts = await api.history();
            setAccounts(accounts);

        })();

    }, []);

    // Build an HTML List of all events from all our User Accounts
    function buildAccountList()
    {
        const accountArray = [];
        var key = 0;

        if (accounts)
        {
            log(`[HISTORY] Returning History listing...`, logSource, `info`);

            // remove MongoDB IDs before using in App Context
            accounts.forEach(element =>
            {
                key++;

                delete element["_id"];

                // pick up the Users array, skipping "users" tag (which is not an array)
                accountArray.push(<li key={key} className="list-group-item">{simplifyText(JSON.stringify(element))}</li>);
            });
        }
        else
        {
            log(`[HISTORY] Awaiting Server response...`, logSource, `warn`);

            accountArray.push(<li key={key} className="list-group-item">Awaiting ${process.env.APP_NAME}-backend response...</li>);
        }

        return accountArray;
    };

    // #endregion

    // #region  E V E N T   H A N D L E R S
    /*
     * *_Click() - 'on click' event handlers for UI elements.
     */

    // opens the UI to show all data in the Accounts
    function showAllData_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        ctx.RevealAccounts = true;

        setNeedInput(false);
    }

    // #endregion

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <AppCard
            bgcolor="warning"
            header="History"
            width="60rem"
            body={needInput ? (
                <form>
                    <h5 className="card-title">Show history for all Accounts</h5>
                    <p className="card-text">WARNING: This will display all the data <br />from the User Account Database.</p>
                    <div className="col-10">
                        <button className="btn btn-outline-light" onClick={showAllData_Click} type="display">Show History</button>
                    </div>
                </form>
            ) : (
                <>
                    <h5>All Account Configuration and Transactions</h5>
                    <br />
                    <ul className="list-group">
                        {/* the rest of the list is built from the Account array returned from the Back-End */}
                        {buildAccountList()}
                    </ul>
                </>
            )}
        />
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default History;

// #endregion

// #endregion
// #endregion