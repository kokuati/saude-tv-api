const express = require('express');
const userServiceClass = require('../../services/users');
const userService = new userServiceClass;
const authService = require("../../services/auth");
const authMiddleware = require('../../middleware/auth');
const passport = require("passport");
let router = express.Router();

router.get('/', authMiddleware, userService.index);
router.get("/check", authMiddleware, authService.sendUser);
router.get('/:id', authMiddleware, userService.show);
router.post('/', userService.store);
router.put('/:id', authMiddleware, userService.update);
router.delete('/:id', authMiddleware, userService.destroy);
router.patch("/:id", authMiddleware, userService.update);

module.exports = router;
