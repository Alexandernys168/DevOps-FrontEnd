# DevOps-FrontEnd for medical records
This is the frontend for the project. It has functionalities such as:
* firebase sign-in
* event tables for displaying lab results (medical records) in a table
* roll-based restrictions on pages with help of firestore (firebase)
* Dashboard for displaying statistics

## Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## About
This repository is a part of a bigger project.
This project presents the development of an innovative full-stack application for patient data management. Leveraging modern technologies such as EventStoreDB and Apache Kafka, the work explores efficient methods for data handling and communication between different system components. By implementing a microservice architecture, the system ensures flexibility, scalability, and robust data protection. The solution not only facilitates effective patient data management but also improves accessibility and interaction between healthcare providers and patients. The results demonstrate a successful integration of various technologies, leading to enhanced management and accessibility of patient information, as well as a solid foundation for future development and adaptation to new requirements. 

## Features
* Security and authentication - Firebase
* Display of all users stored in PatientManagmentService (a microservice of its own)
* Display of all medical records stored in LabResultsService (a microservice of its own)
* Mock-data generation of medical records and patients which get stored in the eventstoredb (as we have no real-world data)
* Dashboard which displays statistics of the medical records.

## Installation
This repository can easily be run by "npm run" locally, however, as this repository is fetching data from a specified url, it is needed to change these.
Currently, all URLs are connected to the cbhCloud, but if wanted could be changed to fetch locally. Just press "ctrl+shift+f" and replace all urls with your own.
Remember to also change the Firebase configuration to your own as the once that I am using are only available for specified web addresses. Otherwise the authentication process won't work.

For the backend:

[Link to LabResult MicroService](https://github.com/sabahAlsaleh/LabResultService/blob/main/README.md)

[Link to PatientManager MicroService](https://github.com/sabahAlsaleh/PatientManagement/blob/main/README.md)

## Usage

If you want to use this code as a template and build from it, read this:
First things first, sorry for the potentially messy code, if you are fine with that, continue reading.
If you want to change anything with authentication and still want to use Firebase. Go to [Auth.js](src/authentication/auth.js) for changing the logic of authentication stuff. Hopefully, the name of the method gives you some clues as to what they actually do. If you want to (which is needed for firebase) change the firebase configuration keys, you will need to change them in [Environment](.env.local).

I could had organized the components and views files better, but you will have to live with this ;)
In the components folder, you will see some files, the most important one is [MockDataGenerator](src/components/MockDataGenerator.ts) which uses a npm library to generate mock data. It's pretty straightforward on how it works, but if any question arises, please visit this page: [Faker.js](https://fakerjs.dev). The other files in this folder are pretty simple to understand and [Message.js](src/components/Message.jsx) is not used.

In the folder utils, I have a single file [Utils](src/utils/utils.js) which is used only to count occurrences, used for the dashboard.

In the folder Views, all files are straight forward, nothing too fancy.

It is in the [index.js](src/index.js) file where the cool stuff is happening (roll-based restrictions). You will see that I am fetching the state of the signed-in user and giving access to different pages depending on the roles.

## Contributing
Main contributor: Alexander Nyström 
Contributor: Erik Görling
