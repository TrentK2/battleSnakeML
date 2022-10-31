# Battlesnake JavaScript Starter

Your starting point for [play.battlesnake.com](https://play.battlesnake.com).

![Battlesnake Logo](https://media.battlesnake.com/social/StarterSnakeGitHubRepos_JavaScript.png)

## Technologies Used

This project uses [Node.js](https://nodejs.dev/) and [Express](https://expressjs.com/).

## Next Steps

Continue with the [Battlesnake Quickstart Guide](https://docs.battlesnake.com/quickstart) to customize and improve your Battlesnake's behavior.

**Note:** To play games on [play.battlesnake.com](https://play.battlesnake.com) you'll need to deploy your Battlesnake to a live web server. The simplest way is to use GitPod which will open this repo in a browser version of VSCode which will have its ports exposed to the internet. 

To do so, add ```gitpod.io/#``` to the very beginning of the url to your github repo (eg gitpod.io/#https://github.com/.....). Make sure to click "Make Public" in the notification that comes up in the bottom right of the GitPod VSCode instance.

With your server running (which it should start up by default), your battlesnake API should be available at "8000-{the url of your GitPod instance}". For example if your GitPod instance has "https://jcscomputer-battlesnake-diug7" in the address bar, your server is available at "https://8000-jcscomputer-battlesnake-diug7". Use this when registering a new Battlesnake at play.battlesnake.com.

To verify that your server is live, point a new browser tab to the url discussed above, it should result in this:

```json
{"apiversion":"1","author":"","color":"#888888","head":"default","tail":"default"}
```

