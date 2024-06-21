const express = require("express")
const {dosave,doSearchUserProfile,doUpdateProfile} = require('../Controller/profileController')
const jwtAuthWithNext = require('../auth/validate-token-with-next')
const app = express.Router();

app.post('/save',dosave)
app.post('/update',doUpdateProfile)
app.get('/find',jwtAuthWithNext,doSearchUserProfile)

module.exports=app