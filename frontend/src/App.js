// #region  H E A D E R
// <copyright file="index.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Web React App (WebApp)
 *      Module:   Modules (./App.js)
 *      Project:  MicroCODE 3-Tier MERN App 'Web App'
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
 *      This module implements the MicroCODE's App React App Entry Point.
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
 *  03-Jun-2022   TJM-MCODE  {0001}    New module implementing the App App Entry.
 *  15-Oct-2022   TJM-MCODE  {0002}    Added 'Send Money' feature.
 *
 *
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React, {useContext} from 'react';

import {HashRouter, Routes, Route} from 'react-router-dom';

import {AppContext} from './Components/AppContext';

import Home from './Components/Home';
import NavBar from './Components/NavBar';
import Account from './Components/Account';
import Login from './Components/Login';
import Events from './Components/Events';
import History from './Components/History';

import './App.css';

// include our common MicroCODE Server Library
import {log} from './mcodeClient.js';

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);

// support .env file variables
require('dotenv').config();

// #endregion

// #region  J A V A S C R I P T

// #region  C O D E   F O L D I N G

// #endregion

// #region  C O N S T A N T S

//    localhost:8081 for development
//    https://appname.mcode.com/backend for frontend
// or http://appname.mcode.com:8081 for backend
//
const apiUrl = `${process.env.REACT_APP_BACKEND_URL}`;

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

// #endregion

// #region  C O M P O N E N T S

/**
 * @func App
 * @memberof app
 * @desc App's Single Page App (SPA).
 * @api public
 * @param {nil} no properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      App();
 *
 */
function App()
{
    // validate PROPS input(s)

    // initialize STATE and define accessors...

    // access CONTEXT for reference...
    const ctx = useContext(AppContext);

    // #region  P R I V A T E   F U N C T I O N S

    // #endregion

    // #region  E V E N T   H A N D L E R S

    // #endregion

    // perform component COMPUTATION to generate output
    log(`APP: Front-End is running using ${apiUrl} to access Back-End.`, logSource, `info`);

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <>
            <HashRouter>

                <NavBar />

                <div className="container" style={{padding: "20px"}}>
                    <Routes>
                        <Route path="/" exact element={<Home />}></Route>
                        <Route path="/Account/" element={<Account />}></Route>
                        <Route path="/Login/" element={<Login />}></Route>
                        <Route path="/Events/" element={<Events />}></Route>
                        <Route path="/History/" element={<History />}></Route>
                    </Routes>
                </div>

                <p>{ctx.Version}</p>

            </HashRouter>
        </>
    );
}

// #endregion
// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default App;

// #endregion