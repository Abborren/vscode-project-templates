'use strict';

import { WorkspaceConfiguration } from 'vscode';
import vscode = require("vscode");
import fs = require('fs');
import path = require('path');

export function run(workspace: string, config: WorkspaceConfiguration) {

    const terminal: vscode.Terminal = vscode.window.createTerminal("Running scripts");
    terminal.show();

    workspace += path.sep + "templatescripts";

    if (fs.existsSync(workspace)) {
        fs.readdir(workspace, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                //Checks all supported filetypes
                supportedFileType(file, config, terminal);
            });
        });
    }
}
/**
 * Returns a the prefix for running a supported filetype, otherwise null.
 * @param file The specified file.
 * @param config The workspace config with the settings variables.
 * @param terminal The new terminal window.
 */
function supportedFileType(file: string, config: WorkspaceConfiguration, terminal: vscode.Terminal) {
    let promise: Promise<string> = new Promise(function (resolve, reject) {
        file = path.extname(file).replace(".", "");
        let types: { [types: string]: string[] | undefined } = config.get("supportedScipts", {});

        if (types !== undefined) {
            Object.keys(types).forEach(function (k) {
                if (k === file) {
                    console.log(k);
                    console.log(types[k]);
                    //TODO FIX THIS RESOLVE SINCE TYPES ARE INVALID. 
                    //resolve(types[k]);        
                }
            });
        }
        reject();
    });
    promise.then((prefix: string) => {
        //terminal.sendText(prefix + " " + workspace + path.sep + file);
    }, () => {

    });

}