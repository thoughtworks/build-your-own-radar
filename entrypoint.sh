#!/bin/sh

echo "Sourcing Secrets"
[ -f "/wna/secrets/secrets.env" ] && . /wna/secrets/secrets.env

echo "Launching App: [$@]"
exec $@