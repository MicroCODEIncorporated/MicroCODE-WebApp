// #region  H E A D E R
// <copyright file="Home.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE App React Home
 *      Module:   Modules (./Home.js)
 *      Project:  MicroCODE Web React App (WebApp)
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
 *      This module implements the MicroCODE's App React Home.
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
 *  02-Jun-2022   TJM-MCODE  {0001}    New module implementing the App Account Home.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React from 'react';
import AppCard from './AppCard';
import logo from '../logo.svg';

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
 * @func Home
 * @memberof app
 * @desc Controls a user logging into their App Account.
 * @api public
 * @param {nil} no properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      Home();
 *
 */
function Home()
{
    // validate PROPS input(s)

    // initialize STATE and define accessors...

    // access CONTEXT for reference...

    // #region  P R I V A T E   F U N C T I O N S

    // #endregion

    // #region  E V E N T   H A N D L E R S

    // #endregion

    // perform component COMPUTATION to generate output

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <AppCard
            txtcolor="black"
            header="MicroCODE's Web App"
            width="30rem"
            title="Welcome to MicroCODE!"
            text='Where LADDERS® knows the difference!'
            body={(<img src={logo} width="400" className="App-logo" alt="App Logo" />)}
        />
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default Home;

// #endregion

// #endregion
// #endregion