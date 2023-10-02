// #region  H E A D E R
// <copyright file="Events.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE App React Events
 *      Module:   Modules (./Events.js)
 *      Project:  MicroCODE React App (WebApp)
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
 *      This module implements the MicroCODE's MicroCODE's React App Events.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MicroCODE JavaScript Style Guide
 *         Local File: MCX-S02 (Internal JS Style Guide).docx
 *         https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *      2. MIT xPRO:
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
 *  Date:         By-Group:   Rev:     Description:
 *
 *  02-Jun-2022   TJM-MCODE  {0001}    New module implementing the creation Bad Bank Eventss.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React from 'react';
import {AppContext} from './AppContext';
import AppCard from './AppCard';

// include the Back-End API
import {api} from '../api/api.js';

// include our common MicroCODE Client Library
import {log, exp, simplifyText} from '../mcodeClient.js';

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
 * @func Events
 * @memberof app
 * @desc the React App Events Component.
 * @api public
 * @param {nil} no properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      Events();
 *
 */
function Events()
{
    // validate PROPS input(s) if required

    // initialize STATE and define accessors...
    const [events, setEvents] = React.useState(0);
    const [status, setStatus] = React.useState('');

    // access CONTEXT for reference...
    const ctx = React.useContext(AppContext);

    // #region  P R I V A T E   F U N C T I O N S

    // useEffect with an empty dependency array
    React.useEffect(() =>
    {
        if (ctx.LoggedIn)
        {
            (async () =>
            {
                try
                {
                    // Get Account Events in Database
                    api.events(ctx.User.email)
                        .then((account) =>
                        {
                            if (!account)
                            {
                                setStatus(log(`[EVENTS] failed, check for an account with: ${ctx.User.email}`, logSource, `error`));
                            }
                            else
                            {
                                setEvents(account.log);
                                log(`[EVENTS] Account: ${JSON.stringify(account)}`, logSource, `warn`);
                                log(`[EVENTS] Account Events succeeded - Email: ${account.email}`, logSource, `success`);
                                setStatus(``);
                            }
                        });
                }
                catch (exception)
                {
                    setStatus(exp(`[EVENTS] EXCEPTION - User: ${ctx.User.email}`, logSource, exception));
                }

            })();
        }
        else
        {
            setStatus(log(`[EVENTS] Must be logged in to get Events...`, logSource, `warn`));
            setEvents(0);
        }

    }, [ctx.LoggedIn, ctx.User.email]);

    // Build an HTML List of all our User Account Events
    function buildEventsList()
    {
        const eventArray = [];
        var key = 0;

        if (events)
        {
            log(`[EVENTS] Formatting Events...`, logSource, `info`);

            // remove MongoDB IDs before using in App Context
            events.forEach(element =>
            {
                key++;

                delete element["_id"];

                // pick up the Events array, convert to JSX
                eventArray.push(<li key={key} className="list-group-item">{simplifyText(JSON.stringify(element))}</li>);
            });
        }
        else
        {
            log(`[EVENTS] Failed to build Event list, no 'Account' data`, logSource, `warn`);
            setEvents([]);

        }
        return eventArray;
    };

    // #endregion

    // #region  E V E N T   H A N D L E R S

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <AppCard
            bgcolor="info"
            header="Events"
            width="60rem"
            status={status}
            body={(
                <>
                    <h5>Account Events</h5>
                    <br />
                    <ul className="list-group">
                        {/* the rest of the list is built from the Events array returned from the Back-End */}
                        {buildEventsList()}
                    </ul>
                </>
            )}
        />
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default Events;

// #endregion

// #endregion
// #endregion