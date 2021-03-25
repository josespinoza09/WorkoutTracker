const express = require("express");
const mongoose = require("mongoose");
const db = require('./models/');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

