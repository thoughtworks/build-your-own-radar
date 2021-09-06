#!/bin/bash

# Regex for updating API_KEY and CLIENT_ID values in compiled js file. Code snippet from googleAuth.js initClient function.
if [[ $API_KEY ]]; then
    sed -i -e "s/\(gapi.client.init({apiKey:\)\"[^\"]*\"/\1\"$API_KEY\"/g" main.*.js
else
    sed -i -e "s/\(gapi.client.init({apiKey:\)\"[^\"]*\"/\1\"\"/g" main.*.js
fi

if [[ $CLIENT_ID ]]; then
    sed -i -e "s/\(gapi.client.init({apiKey:\"[^\"]*\",clientId:\)\"[^\"]*\"/\1\"$CLIENT_ID\"/g" main.*.js
else
    sed -i -e "s/\(gapi.client.init({apiKey:\"[^\"]*\",clientId:\)\"[^\"]*\"/\1\"\"/g" main.*.js
fi

nginx -g 'daemon off;'
