<p align="left">
<img width=15% src="https://dai.lids.mit.edu/wp-content/uploads/2018/06/Logo_DAI_highres.png" alt=“DAI-Lab” />
<i>An open source project from Data to AI Lab at MIT.</i>
</p>

<!-- Uncomment these lines after releasing the package to PyPI for version and downloads badges -->
<!--[![PyPI Shield](https://img.shields.io/pypi/v/sibylapp.svg)](https://pypi.python.org/pypi/sibylapp)-->
<!--[![Downloads](https://pepy.tech/badge/sibylapp)](https://pepy.tech/project/sibylapp)-->

[![Travis CI Shield](https://travis-ci.org/HDI-Project/sibylapp.svg?branch=master)](https://travis-ci.org/HDI-Project/sibylapp)
[![Coverage Status](https://codecov.io/gh/HDI-Project/sibylapp/branch/master/graph/badge.svg)](https://codecov.io/gh/HDI-Project/sibylapp)

# sibylapp

Explanation tool for machine learning

<!-- - Documentation: https://HDI-Project.github.io/sibylapp -->

-   The Restful APIs documentation: http://18.223.186.158/
-   Homepage: https://github.com/DAI-Lab/sibylapp

# Overview

Interpretability is perhaps most impactful in situations where humans make decisions with input from amachine learning model. In such situations, humans have traditionally made decisions without ML models, and as such use the ML model predictions as an aideto improve their effectiveness or speed.
In these cases, explanations can serve many functions. They may help build user trust in the model, identify possible mistakes in the model’s prediction, expedite decisionmaking, maintain accountability, validate their hypotheses, or satisfy curiosity.

Sibylapp is an online interactive tool built on the top of Sibyl (python library) to provide explanations to predictive models on tabular data.

# Getting Started

## Requirements
Sibylapp runs on node. We recommend using nvm to run. You can install it using the guide [here](https://github.com/nvm-sh/nvm).

## Steps to Install and Run
Sibylapp requires node version v14.15.0. We recommend using [NVM](https://github.com/nvm-sh/nvm) (for windows) or [N](https://github.com/tj/n) (for mac/linux) for node/npm version management. You can run the app in development mode with:
```bash
cd client
rm -rf node_modules && rm -rf build
npm install 
npm start
```

Or in production mode with:
```bash
cd client
npm install -g serve 
rm -rf node_modules && rm -rf build
npm install 
npm run build
serve -s build -p 4200
```

## Install for Development

If you want to contribute to the project, a few more steps are required to make the project ready
for development.

Please head to the [Contributing Guide](https://HDI-Project.github.io/sibylapp/contributing.html#get-started)
for more details about this process.

# Quickstart

In this short tutorial we will guide you through a series of steps that will help you
getting started with **sibylapp**.

TODO: Create a step by step guide here.

# What's next?

For more details about **sibylapp** and all its possibilities
and features, please check the [documentation site](https://HDI-Project.github.io/sibylapp/).
