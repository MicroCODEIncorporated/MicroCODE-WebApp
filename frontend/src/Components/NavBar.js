// #region  H E A D E R
// <copyright file="NavBar.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE React App Nav Bar
 *      Module:   Modules (./NavBar.js)
 *      Project:  MicroCODE Web React App (WebApp)
 *      Customer: Internal
 *      Creator:  MicroCODE Incorporated
 *      Date:     June 2, 2022
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
 *      This module implements the MicroCODE's App React Nav Bar.
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
 *  02-Jun-2022   TJM-MCODE  {0001}    New module implementing the App Nav Bar.
 *  15-Oct-2022   TJM-MCODE  {0002}    Added 'Send Money' feature.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React, {useContext, useState} from 'react';
import {AppContext} from './AppContext';

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
 * @func NavBar
 * @memberof app
 * @desc the App Navigation Bar.
 * @api public
 * @param {nil} no properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      NavBar();
 *
 */
function NavBar()
{
    // validate PROPS input(s) if required

    // initialize STATE and define accessors...
    let [, setState] = useState();

    // access CONTEXT for reference...
    const ctx = useContext(AppContext);

    // #region  P R I V A T E   F U N C T I O N S

    function forceUpdate()
    {
        // passing empty object will re-render the component
        setState({});
    }

    // #endregion

    // #region  E V E N T   H A N D L E R S
    /*
     * *_Click() - 'on click' event handlers for UI elements.
     */

    // #endregion

    // perform component COMPUTATION to generate output

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light" onClick={forceUpdate}>
                <a className="navbar-brand" tooltip="Return to bank home page" href="#/">MicroCODE</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarId">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            {!ctx.LoggedIn ? (
                                <a className="nav-link" tooltip="Create one or more accounts" href="#/account/" aria-disabled="false">Account(s)</a>
                            ) : (
                                <a className="nav-link disabled" tooltip="Log out to create new account(s)" href="#/account/" aria-disabled="true">Account(s)</a>
                            )}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" tooltip="Log into a existing account" href="#/login/">Login/out</a>
                        </li>
                        <li className="nav-item">
                            {!ctx.LoggedIn ? (
                                <a className="nav-link disabled" tooltip="Log in to view events" href="#/events/" aria-disabled="true">Events</a>
                            ) : (
                                <a className="nav-link" tooltip="View Events of your account" href="#/events/" aria-disabled="true">Events</a>
                            )}
                        </li>
                        <li className="nav-item">
                            {(ctx.LoggedIn && ctx.Privileged) ? (
                                <a className="nav-link" tooltip="Check history of all accounts" href="#/history/" aria-disabled="true">History</a>
                            ) : (
                                <a className="nav-link disabled" tooltip="Log as DEVELOPER to view" href="#/history/" aria-disabled="true">History</a>
                            )}
                        </li>
                        <li className="nav-item">
                            {!ctx.LoggedIn ? (
                                <a className="nav-link disabled" tooltip="No User logged in" href="#/user/" aria-disabled="true">Log in required...</a>
                            ) : (
                                <a className="nav-link disabled" tooltip="Current User" href="#/user/" aria-disabled="true">Welcome {ctx.User.username}!</a>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default NavBar;

// #endregion

// #endregion
// #endregion