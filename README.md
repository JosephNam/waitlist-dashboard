# waitlist-dashboard
visualizing waitlist prediction times and mixpanel funnels

#Breakdown of the app (tentative)
###  server requests data from three possible sources
  - Source for mixpanel
  - source for spark stuff
  - source for actual historical data

### server sends data to client
  - [data] -> [visualization container] -> [visualization]

### if client chooses diff type of vis than the current
  - [visualization container] -> [action] -> [reducer] -> [store] -> [update visualization component]

