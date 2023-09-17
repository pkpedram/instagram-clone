const { authenticateJwtToken } = require("../../core/middlewares/jwt");
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

              let token = generateJwtToken({
                username: req.body.usernameOrOther,
                role: user.role,
                userId: user._id,
              });

              return await res
                .status(201)
                .send({ message: "user Created By Phone Number", token: token, userData: user });

            case checks.email(req.body.usernameOrOther):
              let emailUser = new User({
                password: encrypt(req.body.password),
                role: "basic",
                email: req.body.usernameOrOther,
              });
              await emailUser.save();
              let emailToken = generateJwtToken({
                username: req.body.usernameOrOther,
                role: emailUser.role,
                userId: emailUser._id,
              });

              return await res
                .status(201)
                .send({ message: "user Created By Email", token: emailToken, userData: emailUser  });

            case checks.username(req.body.usernameOrOther):
              let usernameUser = new User({
                password: encrypt(req.body.password),
                role: "basic",
                username: req.body.usernameOrOther,
              });
              await usernameUser.save();

              let usernameToken = generateJwtToken({
                username: req.body.usernameOrOther,
                role: usernameUser.role,
                userId: usernameUser._id,
              });

              return await res
                .status(201)
                .send({ message: "user Created By Username", token: usernameToken, userData: usernameUser  });
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
          ], password: encrypt(req.body.password)
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
  updateProfile: {
    middlewares: [
        authenticateJwtToken(['basic','user']),
        upload('_user_profile').fields([{name: 'avatar', maxCount: 1}])
    ],
    controller: async (req, res, next) => {
        try{

            console.log(req.user)
            const user = await User.findOne({
                $or: [
                  { email: req.user.username },
                  { phoneNumber: req.user.username },
                  { username: req.user.username },
                ]
              });

            
            if(user){
                switch(true){
                    case !!await User.findOne({username: req.body.username}):
                        let foundUserBuUserName = await User.findOne({username: req.body.username})
                        if(user._id !== foundUserBuUserName?._id){
                            return res.status(400).send({message: 'There is Already a User with this Username'})
                        }

                        case !!await User.findOne({email: req.body.email}):
                        let foundUserByEmail = await User.findOne({email: req.body.email})
                        if(user._id !== foundUserByEmail?._id){
                            return res.status(400).send({message: 'There is Already a User with this Email'})
                        }

                        case !!await User.findOne({phoneNumber: req.body.phoneNumber}):
                        let foundUserByPhoneNumber = await User.findOne({phoneNumber: req.body.phoneNumber})
                        if(user._id !== foundUserByPhoneNumber?._id){
                            return res.status(400).send({message: 'There is Already a User with this PhoneNumber'})
                        }

                    default:

                console.log(req.files)

                if(req.files.avatar){
                    user['avatar'] = generateFileName(req.files.avatar[0], '_user_profile')
                }
                
                let keys = Object.keys(req.body); 
                keys.filter(itm => !['_id', 'password', '_v', 'role'].includes(itm)).map(item => user[item] = req.body[item])
                const updatedUser = await user.save();
                if(updatedUser ){
                    return res.send({result: updatedUser })
                }else{
                   return res.status(500).send({message: 'Error in updating User'})
                }
                }

            }else{
               return res.status(404).send({message: 'There is no User with this info'})
            }
        }catch (error){
            if(process.env.NODE_ENV !== 'production'){
                console.log(error)
            }
            res.status(500).send({message: error})
            next()
        }
    }
    }
  
};

module.exports = usersController;
