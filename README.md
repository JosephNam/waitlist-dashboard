# waitlist-dashboard
Visualize waitlist prediction times and mixpanel funnels.

## Local Development
* `npm install` -- install dependencies
* `npm start` -- starts server on localhost:3000
* `npm watch` -- watches and builds client js
* `npm run build` -- builds all and copies to /app for deployment
* `npm test` -- runs all tests for client and server
* `npm test:watch` -- runs all tests and watches

## Deployment
#### Prereqs
* Install [otpl-deploy-scripts](https://github.com/opentable/otpl-deploy-scripts) and make sure otpl-deploy is in your shell PATH.

#### Steps to deploy
* `npm run build`
* `bin/mk_docker`
* `bin/deploy_latest`

#### Quick links
* [Discovery PP](http://discovery-pp-uswest2.otenv.com/web/state.html?queries[search]=waitlist-dashboard)
* [Singularity Request](http://singularity-qa-uswest2.otenv.com/request/pp-waitlist-dashboard)

----

## Breakdown of the code structure (WIP)
### server requests data from three possible sources
  - Source for mixpanel
  - source for spark stuff
  - source for actual historical data

### server sends data to client
  - [data] -> [visualization container] -> [visualization]

### if client chooses diff type of vis than the current
  - [visualization container] -> [action] -> [reducer] -> [store] -> [update visualization component]
