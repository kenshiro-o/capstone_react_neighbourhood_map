# Neighbourhood Map

This is the capstone project for the Udacity front-end nanodegree. In this project we have created a neighbourhood map of Paris using
predominantly React and Google Maps. We have also employed some important libraries to help us build this application, like Redux.

## Installation

Install dependencies with the command:

```
npm install
```

Then simply run the application with the command:

```
npm start
```

## Code Structure

```
.
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── img
│   │   └── eiffel-tower.svg
│   ├── index.html
│   └── manifest.json
└── src
    ├── API
    │   └── WikipediaAPI.js
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── assets
    │   └── svg
    │       └── eiffel-tower.svg
    ├── index.css
    ├── index.js
    ├── logo.svg
    ├── modules
    │   ├── List
    │   │   ├── ListContainer.js
    │   │   ├── actions.js
    │   │   └── reducers
    │   │       └── index.js
    │   ├── Map
    │   │   ├── Map.js
    │   │   ├── actions.js
    │   │   └── reducers
    │   │       └── index.js
    │   ├── Place
    │   │   └── PlaceContainer.js
    │   ├── Places
    │   │   ├── PlacesContainer.js
    │   │   └── reducers
    │   └── Search
    │       └── SearchContainer.js
    ├── serviceWorker.js
    └── store.js
```

All important source code, with the exception of possibly `index.html`, are located inside the `/src` folder. For this project I have decided to organise my React components
around _modules_, as opposed to adopting the more conventional and functional structure where there is a `components/` folder that groups all components together.
The reason why I adopted this approach is so that I can think of my modules as independent, self-sufficient features of a broader application where all necessary code
is included in the given module folder:
* Component
* Actions
* Reducers (more on this below)

Lastly, this project was initially created with the `create-react-app` command.

### Loading Google Maps

Initially, one of the trickiest tasks was to load the Google Maps Javascript API. I attempted to use a couple of already packaged libraries to this purpose, but found myself
frustrated at not understanding what kind of dark magic was going on behind the scenes, so I embarked on discovering the truth by myself and building my own
React Google Maps component.

The `Map.js` is responsible for loading the Google Maps Javascript API and make it available to all components that require it. Broadly speaking, we dynamically load the Google Maps
library via the following mechanism:
* append a `<script src="https://maps.googleapis.com/maps/api/js?key=API_KEY&v=3">` to the body of the DOM
* wait for the script to be fully loaded by subscribing to the `load` event
* Upon `load` event triggered, execute a function that creates the map and dispatch a Redux event with the map to force a render on all subscribing component

### Why Redux

In Addition to being able to update the state of a local component or pass props to children with vanilla React, I felt I need to be able to more easily share _global_ state
across many components, regardless of their hierachy. This need was driven by the fact that the `map` object should globally be available to all components that wish to use it.

In order to share common state across many components, I decided to use [Redux](https://redux.js.org/), which is battle tested with React. In Redux, we define a `store` which is the application's source
of truth and enable components to subscribe to certain elements within the store to receive updates whenever the store's state changes. The store itself can only be update under
specific cirmcustances by a _reducer_, which is a pure function that handles state updates.



### Wikipedia API

As part of this project, I also use a third-party API to fetch information about the places of interest. I specifically decided to use rely on information from Wikipedia as:
* It is well known
* The information is generally up to date
* It contains a lot of entries on a wide range of topics

Granted, Wikipedia may not be the most authoritative source of information out there, but for the purposes of this project it should do really well.


Unfortunately, Wikipedia do not provide a Javascript API we could just download and integrate into our project.
I wrote one such client called [wikipedia-js](https://github.com/kenshiro-o/wikipedia-js) a couple of years ago but have not maintained
it for many years so I also decided to start from scratch and provide a simple Javascript library to perform the following operations:
1. Search pages matching a given `query`
2. Retrieve _summary_ information about a given page

We first search (1) and then use the first result from the search to obtain summary information about the page (2). The API is very simple to use and is Promise-based.
It is currently used to retrieve retrieve summary information about the places of interest and display them in a Google Maps InfoWindow.


### Internal Component State

Many components in addition to subscribing to specific updates from the Redux store, also maintain internal state via `this.state`. This is because some of this state
information should not be available outside a given component and its children, which is why they are not being maintained in the Redux store.
For instance, controlled components like `PlaceContainer` maintain information about their marker, info window, and info window content.
This information should not be globally available.



## Layout


We employ basic css; no framework like SASS or LESS are used in this project. The
reason why is because I simply felt the size of the project was too small to warrant
the overhead of using a framework.

One thing I realised though is that the styles are _directly inserted_ into the html
document by _create-react-app_, which is not ideal. In the future, I'd like to
tackle this issue so that the css styles are imported in the HTML. I can easily do
this to be honest but I need to find a way to prevent _create-react-app_ from
inlining the css into the HTML document.

As we strive to create a responsive, we are using media queries in some places to
accommodate for different screen sizes, such as in the following case for the
InfoWindow when selecting a place of interest on the list menu or clicking on one:

```
@media screen and (max-width: 500px){
  .place-info-container{
    width: 350px;
    max-height: 300px;
  }
  ...
  ...
}
```


Moreover, we use a sliding menu on the left to enable the map to occupy the whole
screen when the user deems the former unnecessary. We simply use a basic animation to
transition _slide-in_ or _slide-out_ the menu depending on the user's itent. A css
property is toggled to determining which one of the sliding actions to undertake.


## Future Improvements

There are many potential improvements that could be made to this project. Some of
the following come to my mind:
* modify _create-react-app_ or simply writing own webpack scripts to have more control over build process
* improve performance on the general rending and re-use of map components like markers
* better styling for search bar: it looks very plain right now
* have more control over service worker logic
* use more functional componenents


Overall, this was a fun project where I learned a great deal about React, Redux and the general lifecycle events of such libraries.

