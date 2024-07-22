# Setup Website for Raffaella Rinaldi

First, make sure you install the required global dependencies.

`npm i -g gulp gulp-rename npm-run-all`

Then, open your preferred terminal application.

```
mkdir /your/preferred/project/location/
cd /your/preferred/project/location/
```

Copy the code out of the GitHub repository.

`git clone https://github.com/raffaellarinaldi/raffaellarinaldi.git --recursive`

Check for submodule updates.

`git submodule update --remote`

## [https://www.raffaellarinaldi.dev/](https://www.raffaellarinaldi.dev/)

Start Eleventy.

`npm run start`

Open your browser and visit the local copy of the site.

[http://localhost:8080/](http://localhost:8080/)

## Build HTML Source Files

To generate the HTML source files in the `dist/` directory.
Remember to run this command to save static assets for Netlify before committing to GitHub.

`npm run build`
