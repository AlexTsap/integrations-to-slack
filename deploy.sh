#!/bin/bash

set -e # Abort script at first error
set -u # Disallow unset variables

# Install the toolbelt, and the required plugin.
#curl https://cli-assets.heroku.com/install.sh | sh

#heroku plugins:install @heroku-cli/plugin-container-registry

docker login --username=alexandr.tsap@valor-software.com  --password=6eae6f97-e30f-4ee8-8c0c-d414ce1ca257 registry.heroku.com
heroku container:push web  --app valor-slack-integration
heroku container:release web --app valor-slack-integration
