const express = require('express');
const router =  express.Router();

const { signup, signin } = require('../controllers/auth');

router.get("/", (req, res) => {
  return res.json({
    data: "Hello world from api"
  })
});

router.post("/signup", signup);
router.post("/signin", signin);
// TODO: Forgot password / reset password

module.exports = router;