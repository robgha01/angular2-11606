# angular2-11606
Inheritance for Angular decorators not merging properties if not set in child.

Clone the poc, install yarn from https://yarnpkg.com/en/docs/install
run nodejs console with admin rights at least im using admin rights to prevent any issues it may or may not be needed.
cd to the UI.Client folder and execute "yarn install" this will install all dependencies from npm.

Start the poc by opening watch.cmd it will fire up a browser-sync and webpack dev server.

The typescript components is located at
UI.Client/src/typescript/components.

the ones to look at for the actuall error as the properties is not inherited is for
**"simple-login-component"** and **"search-box-component"**.