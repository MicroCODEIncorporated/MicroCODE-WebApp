// #region  H E A D E R
// <copyright file="account.js" company="MicroCODE Incorporated">Copyright © 2022 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  P R E A M B L E
// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE App React Account
 *      Module:   Modules (./account.js)
 *      Project:  MicroCODE App React App
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
 *      This module implements the MicroCODE's App React Account.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1.  MicroCODE JavaScript Style Guide
 *          Local File: MCX-S02 (Internal JS Style Guide).docx
 *          https://github.com/MicroCODEIncorporated/JavaScriptSG
 *
 *      2.  HOW-TO: Sign in with Apple on React and React-Native using Node
 *          by Sunim Acharya
 *          https://dev.to/aryaminus/how-to-sign-in-with-apple-on-react-and-react-native-using-node-5g0b
 *
 *
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
 *  02-Jun-2022   TJM-MCODE  {0001}     New module implementing the creation App Accounts.
 *  14-Oct-2022   TJM-MCODE  {0002}     Added Roles for controlling access to ALL DATA.
 *  17-Oct-2022   TJM-MCODE  {0003}     UAT: Force ROLE to all CAPS during entry... should actually be a pulldown.
 *
 *
 */

// #endregion
// #endregion
// #endregion

// #region  I M P O R T S

import React, {useContext, useState} from 'react';
import BankCard from './BankCard';

// get our app-wide context
import {AppContext} from './AppContext';

// include the Back-End API
import {api} from '../api/api.js';

// include our common MicroCODE Client Library
import {log, exp} from '../mcodeClient.js';

// get our current file name for logging events
var path = require('path');
var logSource = path.basename(__filename);


// #endregion

// #region  J A V A S C R I P T
// #region  F U N C T I O N S

// #region  C O N S T A N T S

const MINIMUM_PASSWORD_LENGTH = 8;
const MINIMUM_OPENING_DEPOSIT = 100;

// #region  C O N S T A N T S

// #endregion

// #region  P R I V A T E   F I E L D S

// #endregion

// #region  E N U M E R A T I O N S

// #endregion

// #region  C O M P O N E N T – P U B L I C

/**
 * @func Account
 * @memberof app
 * @desc The App Account Component.
 * @api public
 * @param {nil} no properties.
 * @returns {JSX} JavaScript Extension (JSX) code representing the current state of the component.
 *
 * @example
 *
 *      Account();
 *
 */
function Account()
{
    // validate PROPS input(s) if required

    // initialize STATE and define accessors...
    const [cleared, setCleared] = useState(false);
    const [needInput, setNeedInput] = useState(true);
    const [status, setStatus] = useState('');
    const [submit, setSubmit] = useState('');

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CUSTOMER');
    const [balance, setBalance] = useState(0);

    // access CONTEXT for reference...
    const ctx = useContext(AppContext);

    // #region  P R I V A T E   F U N C T I O N S

    // field validation...
    function validate(field, label)
    {
        if (!field)
        {
            setStatus(`warn: A ${label} is required.`);
            setSubmit('Disabled');
            return false;
        }

        if (label === "email")
        {
            const regexEmail = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

            if (!field.match(regexEmail))
            {
                setStatus(`warn: A valid email is required.`);
                setSubmit('Disabled');
                return false;
            }
        }

        if (label === "password")
        {
            if (field.length < MINIMUM_PASSWORD_LENGTH)
            {
                setStatus(`warn: Password must be at least ${MINIMUM_PASSWORD_LENGTH} characters.`);
                setSubmit('Disabled');
                return false;
            }
        }

        if (label === "role")
        {
            let requestedRole = field.toUpperCase();

            if ((requestedRole !== "BANKER")
                && (requestedRole !== "CUSTOMER")
                && (requestedRole !== "AUDITOR"))
            {
                setStatus(`error: Role must be one of: BANKER, CUSTOMER, AUDITOR.`);
                setSubmit('Disabled');
                return false;
            }
        }

        if (label === "balance")
        {
            if (field < MINIMUM_OPENING_DEPOSIT)
            {
                setStatus(`warn: Opening deposit is less than minimum.`);
                setSubmit('Disabled');
                return false;
            }
        }

        return true;
    }

    // validates all form fields for CREATE
    function checkCreateFields()
    {
        setSubmit('Disabled');

        if (!validate(username, 'username')) return false;
        if (!validate(email, 'email')) return false;
        if (!validate(password, 'password')) return false;
        if (!validate(balance, 'balance')) return false;
        if (parseInt(balance) < MINIMUM_OPENING_DEPOSIT) return false;

        setSubmit('');
        setStatus('');

        return true;
    }

    // validates all form fields for DELETE
    function checkDeleteFields()
    {
        setSubmit('Disabled');

        if (!validate(username, 'username')) return false;
        if (!validate(email, 'email')) return false;
        if (!validate(password, 'password')) return false;
        if (!validate(role, 'role')) return false;

        setSubmit('');
        setStatus('');

        return true;
    }

    // clear fields and prepares for new data
    function clearForm()
    {
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('CUSTOMER');
        setBalance('');

        setSubmit('Disabled');
    };

    // #endregion

    // #region  E V E N T   H A N D L E R S
    /*
     * *_Click() - 'on click' event handlers for UI elements.
     */

    // clears the UI fields for Account creation unconditionally
    function clearForm_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        clearForm();
        setNeedInput(true);
        setStatus(``);
    }

    // creates a User Account if passed validate input fields
    async function createAccount_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        log(`[ACCOUNT] Creating new Account - name: ${username} email: ${email} password: ${password} role: ${role}`, logSource, `info`);

        if (!checkCreateFields())
        {
            log(`[ACCOUNT] Create failed - email: ${email} password: ${password}`, logSource, `warn`);

            return;
        }

        log(`[ACCOUNT] Attempting to Create User...`, logSource, `wait`);

        try
        {
            // Create Account in Database
            api.create(username, email, password, role, balance)
                .then((account) =>
                {
                    if (!account)
                    {
                        setStatus(log(`[ACCOUNT] Create Account failed, ${email} is already used.`, logSource, `error`));
                        setNeedInput(true);
                    }
                    else
                    {
                        // immediately log them in on create
                        delete account._id;  // the MongoDB ID is not part of our Client 'user'
                        ctx.setUser(account);  // update current user
                        ctx.setLoggedIn(true);

                        ctx.setPrivileged((account.role === "BANKER") || (account.role === "AUDITOR"));

                        setStatus(log(`[ACCOUNT] Create succeeded - User: ${account.email}`, logSource, `success`));
                        setNeedInput(false);
                    }
                });
        }
        catch (exception)
        {
            setStatus(exp(`[ACCOUNT] Create Account failed - User: ${email}`, logSource, exception));
            setNeedInput(true);
            setSubmit('Disabled');
        }
    }

    // deletes a User Account given proper credentials
    async function deleteAccount_Click(e)
    {
        e.preventDefault();  // we're handling it here (prevent: error-form-submission-canceled-because-the-form-is-not-connected)

        log(`[ACCOUNT] Deleting old Account - name: ${username} email: ${email} password: ${password} role: ${role}`, logSource, `info`);

        if (!checkDeleteFields())
        {
            log(`[ACCOUNT] Delete failed - email: ${email} password: ${password}`, logSource, `warn`);

            return;
        }

        log(`[ACCOUNT] Attempting to Delete User...`, logSource, `wait`);

        try
        {
            // Delete Account from Database
            api.delete(username, email, password)
                .then((account) =>
                {
                    if (!account)
                    {
                        setStatus(log(`[ACCOUNT] Delete failed, ${email} does not exist.`, logSource, `error`));
                        setNeedInput(true);
                    }
                    else
                    {
                        setStatus(log(`[ACCOUNT] Delete succeeded - User: ${email}`, logSource, `success`));
                        setNeedInput(true);
                        setUsername(``);
                        setEmail(``);
                        setPassword(``);
                        setBalance(0);

                        ctx.setUser({});
                        ctx.setLoggedIn(false);
                    }
                });
        }
        catch (exception)
        {
            setStatus(exp(`[ACCOUNT] Delete Account CRASHED - User: ${email}`, logSource, exception));
            setNeedInput(true);
            setSubmit('Disabled');
        }
    }

    // #endregion

    // perform component COMPUTATION to generate output
    if (!cleared)
    {
        clearForm();
        setCleared(true);
    }

    // OUTPUT the Component's JavaScript Extension (JSX) code...
    return (
        <BankCard
            bgcolor="primary"
            header="Account"
            width="30rem"
            status={status}
            body={needInput ? (
                <form>
                    Name<br />
                    <input type="input" autoComplete="new-password" required={true} className="form-control" id="name"
                        placeholder="Enter name" value={username} onChange={e =>
                        {
                            setSubmit('');
                            setStatus('');
                            setUsername(e.currentTarget.value);
                            validate(e.currentTarget.value, 'name');
                        }} /><br />

                    Email Address<br />
                    <input type="email" autoComplete="new-password" required={true} className="form-control" id="email"
                        placeholder="Enter email" value={email} onChange={e =>
                        {
                            setSubmit('');
                            setStatus('');
                            setEmail(e.currentTarget.value);
                            validate(e.currentTarget.value, 'email');
                        }} /><br />

                    Password<br />
                    <input type="password" autoComplete="new-password" required={true} className="form-control" id="password"
                        placeholder="Enter password" value={password} onChange={e =>
                        {
                            setSubmit('');
                            setStatus('');
                            setPassword(e.currentTarget.value);
                            validate(e.currentTarget.value, 'password');
                        }} /><br />

                    Account Type<br />
                    <input type="role" autoComplete="new-role" required={true} className="form-control" id="role"
                        placeholder="Enter BANKER, CUSTOMER, or AUDITOR" value={role} onChange={e =>
                        {
                            setSubmit('');
                            setStatus('');
                            setRole(e.currentTarget.value.toUpperCase());
                            validate(e.currentTarget.value, 'role');
                        }} /><br />

                    Initial Deposit<br />
                    <input type="input" autoComplete="new-deposit" required={true} className="form-control" id="balance"
                        placeholder="Initial balance ($100 min.)" value={balance} onChange={e =>
                        {
                            setSubmit('');
                            setStatus('');
                            setBalance(e.currentTarget.value);
                            validate(e.currentTarget.value, 'balance');
                        }} /><br />

                    <button type="button" className="btn btn-light" onClick={clearForm_Click}>Clear</button>
                    <> </>
                    <button type="submit" className="btn btn-light" onClick={createAccount_Click} disabled={submit}>Create</button>
                    <> </>
                    <button type="submit" className="btn btn-light" onClick={deleteAccount_Click} disabled={submit}>Delete</button>
                    <br />
                </form>
            ) : (
                <>
                    <h5>Success</h5>
                    <br />
                    <button type="submit" className="btn btn-light" onClick={clearForm_Click}>Add another account</button>
                </>
            )}
        />
    );
}

// #endregion

// #region  C O M P O N E N T - E X P O R T S

export default Account;

// #endregion

// #endregion
// #endregion