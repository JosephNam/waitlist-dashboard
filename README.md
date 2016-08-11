# waitlist-dashboard
Visualize waitlist prediction times and mixpanel funnels.

## random tidbits
using ducks organizational structure
didn't completely finish refactor
need to move some of these container components into a better structure, probably can just pass props

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
* Install JDK 8

#### Steps to deploy
* `npm run build`
* `npm run build:docker`
* `npm run deploy`

## Quick links
* [PP Waitlist-Dashboard](http://waitlist-dashboard.otenv.com/)
* [PP Discovery](http://discovery-pp-uswest2.otenv.com/web/state.html?queries[search]=waitlist-dashboard)
* [PP Singularity Request](http://singularity-qa-uswest2.otenv.com/request/pp-waitlist-dashboard)

----
# brief break down
fetchData() -> data -> receiveData() -> propagate data as a prop down to components -> getVisible helper from VisualizationHelpers -> renders graph based on what is current visualization filters
