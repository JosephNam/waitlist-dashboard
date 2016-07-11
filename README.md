# waitlist-dashboard
Visualize waitlist prediction times and mixpanel funnels.

## Local Development
* `bower install` -- install client dependencies
* `npm install` -- install server dependencies
* `npm start` -- starts server on localhost:3000
* `npm run build` -- builds all and copies to /app for deployment
* `npm run build:watch` -- watches and builds client js
* `npm run build:docker` -- builds docker image for deployment
* `npm test` -- runs all tests for client and server
* `npm test:watch` -- runs all tests and watches

## Deployment
#### Prereqs
* Install [otpl-deploy-scripts](https://github.com/opentable/otpl-deploy-scripts) and make sure otpl-deploy is in your shell PATH.

#### Steps to deploy
* `npm run build`
* `npm run build:docker`
* `npm run deploy`

## Quick links
* [PP Waitlist-Dashboard](http://waitlist-dashboard.otenv.com/)
* [PP Discovery](http://discovery-pp-uswest2.otenv.com/web/state.html?queries[search]=waitlist-dashboard)
* [PP Singularity Request](http://singularity-qa-uswest2.otenv.com/request/pp-waitlist-dashboard)

----

## Breakdown of the code structure (WIP)
### server requests data from three possible sources
  - source for mixpanel
  - source for spark stuff
  - source for actual historical data

### server sends data to client
  - [data] -> [visualization container] -> [visualization]

### if client chooses diff type of vis than the current
  - [visualization container] -> [action] -> [reducer] -> [store] -> [update visualization component]
