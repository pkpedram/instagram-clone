const { upload } = require("../../core/middlewares/multer");
const checks = require("../../core/utils/checks");
const { encrypt } = require("../../core/utils/hasher");
const { generateJwtToken } = require("../../core/utils/jwt");
const { generateFileName } = require("../../core/utils/multer");
const User = require("../../models/User");

const usersController = {
  postBasic: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        let foundUser = await User.findOne({
          $or: [
            { email: req.body.usernameOrOther },
            { phoneNumber: req.body.usernameOrOther },
            { username: req.body.usernameOrOther },
          ],
        });

        if (!foundUser?._id) {
          console.log(req.body);
          switch (true) {
            case checks.phoneNumber(req.body.usernameOrOther):

                console.log('PHONE NUMBER CHECK')
              let user = new User({
                password: encrypt(req.body.password),
                role: "basic",
                phoneNumber: req.body.usernameOrOther,
              });
              await user.save();

              return await res
                .status(201)
                .send({ message: "user Created By Phone Number" });

            case checks.email(req.body.usernameOrOther):
              let emailUser = new User({
                password: encrypt(req.body.password),
                role: "basic",
                email: req.body.usernameOrOther,
              });
              await emailUser.save();

              return await res
                .status(201)
                .send({ message: "user Created By Email" });

            case checks.username(req.body.usernameOrOther):
              let usernameUser = new User({
                password: encrypt(req.body.password),
                role: "basic",
                username: req.body.usernameOrOther,
              });
              await usernameUser.save();

              return await res
                .status(201)
                .send({ message: "user Created By Username" });
            default:
              res.status(400).send({ message: "Please Enter Valid Data" });
          }
        } else {
          res.status(400).send({ message: "A user was found with this data." });
        }
      } catch (error) {
        console.error(error);
        res.send(error);
        next();
      }
    },
  },
  login: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        let user = await User.findOne({
          $or: [
            { email: req.body.usernameOrOther },
            { phoneNumber: req.body.usernameOrOther },
            { username: req.body.usernameOrOther },
          ],
        });
        console.log(user);
        if (user?._id) {
          let token = generateJwtToken({
            username: user.username,
            role: user.role,
            userId: user.id,
          });
          return res.send({ token: token, userData: user });
        } else {
          res.status(404).send({ message: "user not found please signup" });
        }
      } catch (error) {
        console.error(error);
        next();
      }
    },
  },
  loginAdmin: {
    middlewares: [],
    controller: async (req, res, next) => {
      try {
        let user = await User.findOne({
          username: req.body.username,
          password: encrypt(req.body.password),
        });
        console.log(user);
        if (user?._id && user?.role == "admin") {
          let token = generateJwtToken({
            username: user.username,
            role: user.role,
            userId: user.id,
          });
          return res.send({ token: token });
        } else {
          res.sendStatus(404);
        }
      } catch (error) {
        console.error(error);
        next();
      }
    },
  },
};

module.exports = usersController;
