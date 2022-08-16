#!/bin/bash

set -euo pipefail

####################################################################################
##### Specify software and dependencies that are required for this project     #####
#####                                                                          #####
##### Note:                                                                    ##### 
##### (1) A log file is auto-created when this file runs. If you want to write #####
##### to it, the relative path is ./.brev/logs/setup.log. By default, all      #####
##### stderr and stdout from this file are sent there.                         #####
#####                                                                          #####
##### (2) The working directory is /home/brev/<PROJECT_FOLDER_NAME>. Execution #####
##### of this file happens at this level.                                      #####
####################################################################################

##### Yarn #####
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install -y yarn

##### Node v14.x + npm #####
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

##### Custom commands #####
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
