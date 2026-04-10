# paoloweb.dev
Repo for my personal website.

## Pre-requisites for running locally

- Installation of [Deno](https://deno.com/)
- Run `scripts/install-git-hooks` to install git hooks

## Development

Run the dev script to start a local server and file watcher concurrently:

```
scripts/dev
```

This builds the site, serves files from the `./docs` folder on localhost:8080, and watches for changes in `./posts` to trigger rebuilds automatically.

Most of the files in the `./docs` folder should not be edited directly as they are built using the files in the `./templates` and `./posts` folder. To build run:

```
scripts/build
```

❗️ Remember this 👆 before pushing your changes otherwise it will not work...

## Writing

To create a new post and start writing:

```
scripts/new-post "My Title" && scripts/dev
```

This creates a new post file and launches the dev environment so you can preview your changes live.

## Testing

To run the tests use this command:

```
scripts/test
```

## Deployment
Commits to the `main` branch trigger a deployment to GitHub pages. The website can be viewed at https://pdp2.github.io/hi/. That's it at the moment 😎
