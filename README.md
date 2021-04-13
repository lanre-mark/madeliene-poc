# Quick coding challenge

Welcome to the quick coding challenge! Please read the following instructions carefully.

# The Story

Madeliene runs a very successful manufacturing business making widgets. These
widgets are so popular that Madeliene has a hard time keeping up with demand.
Madeliene inherited a tool that displays information about her inventory, but she
does not find it very helpful. Your job is to build a better tool or improve
upon the existing app. Madeliene will use this tool to search through her
inventory, find out of stock items, and find items that are low on inventory so
she can order replacements.

# Use cases - Madeliene should be able to:

- See all of her inventory
- Search through her inventory
- Be notified of items out of stock
- Be notified of items that are low on stock

# Evaluation

## Technology requirements

**React** and **JavaScript** are mandatory requirements. Apart from this, you
can use any libraries, task runners and build processors. ES6 and TypeScript are
highly encouraged.

## Target requirements

- Is the code easy to follow and reuse?
- Does the code demonstrate an understanding of React best practices?
- Is the user experience of the app awesome?
  - Are there any bugs?
  - Is the inventory information easy to digest?
- Is the code documented nicely?
- Is the code well-tested?
- Does the app meet product requirements?

# Getting started

- Clone this repository.
- Complete your project as described above.

# How to run the API server

The boilerplate includes a small service for data fetching. The file
`server/server.json` includes all the necessary data to achieve the goal. Please
follow the steps below to start the server:

```
yarn or npm install .
yarn server or npm run server
```

Check [json-server](https://github.com/typicode/json-server) for more information.

# Time limit

There is no hard time limit for this quick coding challenge. However, I believe that
4-5 hours is sufficient to satisfy
[Madeliene's use cases](#use-cases-monique-should-be-able-to) for the tool. While
we appreciate all the effort put into the challenge, we also do not want to take
up too much of your time. Our advice is to focus on making sure that the
application works properly & has some tests, and then moving on to crush the other
[Target requirements](#grading-requirements). And please include some comments
about what you would like to improve if given more time. Happy coding!

# How to Run

To start the project and run with your browser. Run the script command below;

```
yarn dev:yarn
```

This will start the server and start the project concurrently.

# Implementational Improvements

- &#9744; make the TableHeader component static (so it's not affected by the scroolbar)

- &#9744; improve user mobile expreience and accessibility options

- &#9744; increase test coverage and include cypress end to end tests

# Conceptual Improvements

There is improvement for quite a lot;

- there was quite a lot of room for testing. I could do more in testing user interactions in the components and have a main test file that details the way a monique interacts with the application itself using mock data.

- there is room to test my types using [dtslint](https://www.npmjs.com/package/dtslint) library especially on runtime data though I added an assertion type checking in the data api module.

- for state management, other options asides the custom data widget service hook include using context api, using state hooks passed down as props from the app component to all the child components like what I currently have using the custom data widger service hook, etc. Other state management libraries such as recoil, flux, redux, xstate, jotai, etc would be an over kill for this project.

- the custom widget data service contained some other functionalities that could have been abstracted into separate modules for separation of concerns. This would have helped to add test cases for those functionalities with injected dependencies.

- one major challenge of the custom widget service hook is that it's doing a lot. while that isn't a problem in an application as straight forwrd as this, the data is tightly coupled into the hook and there is no way to add the data as a dependency outside the module without a hack.
