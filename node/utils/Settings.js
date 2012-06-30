/**
 * The Settings Modul reads the settings out of settings.json and provides 
 * this information to the other modules
 */

/*
 * 2011 Peter 'Pita' Martischka (Primary Technology Ltd)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var os = require("os");
var url = require('url');

/**
 * The IP ep-lite should listen to
 */
exports.ip = "0.0.0.0";
  
/**
 * The Port ep-lite should listen to
 */
exports.port = process.env.PORT;
/*
 * The Type of the database
 */
exports.dbType = "mysql";
/**
 * This setting is passed with dbType to ueberDB to set up the database
 */
exports.dbSettings = {
                      "user"    : url.parse(process.env.CLEARDB_DATABASE_URL).auth.split(':')[0], 
                      "password": url.parse(process.env.CLEARDB_DATABASE_URL).auth.split(':')[1], 
                      "host"    : url.parse(process.env.CLEARDB_DATABASE_URL).hostname, 
                      "database": url.parse(process.env.CLEARDB_DATABASE_URL).pathname.replace(/^\//, '')
                     };
/**
 * The default Text of a new pad
 */
exports.defaultPadText = process.env.ETHERPAD_DEFAULT_TEXT || 'Welcome';

/**
 * A flag that requires any user to have a valid session (via the api) before accessing a pad
 */
exports.requireSession = false;

/**
 * A flag that prevents users from creating new pads
 */
exports.editOnly = false;

/**
 * A flag that shows if minification is enabled or not
 */
exports.minify = false;

/**
 * The path of the abiword executable
 */
exports.abiword = null;

/**
 * The log level of log4js
 */
exports.loglevel = "INFO";

/**
 * Http basic auth, with "user:password" format
 */
exports.httpAuth = null;

//checks if abiword is avaiable
exports.abiwordAvailable = function()
{
  if(exports.abiword != null)
  {
    return os.type().indexOf("Windows") != -1 ? "withoutPDF" : "yes";
  }
  else
  {
    return "no";
  }
}
