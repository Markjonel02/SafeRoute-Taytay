📌 Project Overview

RapidRescue is a web-based emergency response system developed using the MERN stack.
It enables civilians to report emergencies in real time, share their location, and receive faster assistance from responders through a centralized dashboard.

The system leverages free third-party location services (OpenStreetMap + Leaflet) to provide real-time mapping without paid APIs, making it ideal for academic and thesis use.

🎯 Objectives

Provide a fast and reliable emergency reporting platform

Enable real-time location sharing using open-source mapping tools

Improve coordination between users and emergency responders

Track and manage emergency incidents efficiently

Store historical data for analysis and reporting

👥 User Roles
Role	Description
User	Reports emergencies and tracks response status
Responder	Views, accepts, and resolves incidents
Admin	Manages users, responders, and system data
🧩 Core Features
User Module

Emergency reporting with live location

Interactive map display

Incident status tracking

Incident history

Responder Module

Real-time incident feed

Map-based incident visualization

Status updates (Pending, En Route, Resolved)

Admin Module

User & responder management

Incident monitoring

System activity logs

🏗️ System Architecture
Frontend

React

Chakra UI

React Router

Axios

React-Leaflet

Backend

Node.js

Express.js

JWT Authentication

Socket.io (real-time updates)

Database

MongoDB

Mongoose ODM

🗺️ Location & Mapping (Free Third-Party)

This project uses OpenStreetMap (OSM) with Leaflet for free map rendering.

Why OSM + Leaflet?

No API key required

Completely free and open-source

Ideal for academic and small-scale production use

Map Provider: OpenStreetMap
Library: React-Leaflet
Geolocation: Browser Geolocation API

🔐 Security Features

JWT-based authentication

Password hashing with bcrypt

Role-based access control

Input validation & sanitization
