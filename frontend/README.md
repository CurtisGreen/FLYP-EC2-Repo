# FLYP-EC2-Repo
Webapp for FLYP capstone project

### Setup

```
npm install
pm2 start node_modules/react-scripts/scripts/start.js --name Webapp
```

### Control
```
pm2 list // Shows status
pm2 start Webapp
pm2 restart Webapp
pm2 stop Webapp
```

### Notes
* Defaults to port 3000

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
