var express = require("express");
var router = express.Router()
var fs = require("fs");
var jwt = require("jsonwebtoken");

var USERS = []


fs.readFile("./Database/USER.json", (err, data) => {
  if (err) throw err;
  USERS = JSON.parse(data);
  console.log(USERS)
});




router.get("/test", (req, res)=> {
  res.send("its working")
})



////////////////middle were
const authMiddle = async (req, res, next)=> {

  const token = req.cookies.token || req.headers.token || "";
  console.log(token)
  try {
    if (!token) {
      return res.status(401).json('You need to Login')
    }

    const decrypt = await jwt.verify(token, "KEY")

    req.user = {
      username: decrypt.username
    }

    next();

  } catch (e) {
    return res.status(500).json(e.toString());
  }

}









///register route//////////

router.post("/register", (req, res)=> {
  const {
    name,
    address,
    email,
    username,
    password

  } = req.body
  if (!name || !address || !email || !username || !password) {
    res.send("all required")
  }

  USERS.map((user)=> {
    if (user.username == username) {
      res.send("already exists")
    }
  })


  const USER = {
    name: name,
    address: address,
    email: email,
    username: username,
    password: password,
    balance: 0
  }



  USERS.push(USER)



  fs.writeFile("./Database/USER.json",
    JSON.stringify(USERS),
    (err)=> {
      if (err) res.send("user registration unsuccessful")
    })

  const token = jwt.sign({
    username: USER.username
  },
    "KEY")

  res.cookie("token",
    token,
    {
      httpOnly: true
    }).send("registered ")


})

/////login route //////////

router.post("/login", (req, res)=> {

  const {
    username,
    password
  } = req.body
  if (!username || !password) {
    res.send("all required")
  }

  USERS.map((user)=> {
    if (user.username == username && user.password == password) {

      const token = jwt.sign({
        username: username
      },
        "KEY")

      res.cookie("jwt-token",
        token, {
          httpOnly: true
        }).send({username:username,
          token:token
        })


    } else {
      res.status(400).send("login failed")

    }
  })
})


////logout route/////
router.get("/logout", (req, res)=> {
  res.clearCookie("token").send("logged out")
})



/////authenticated routs

router.get("/:username", authMiddle, (req, res)=> {
  USERS.map((user)=> {
    if (req.params.username == user.username) {
      res.send(user)
    }
  })

})


//// amount deposit route

router.post("/depo", authMiddle, (req, res)=> {
  const amount = parseInt(req.body.amount);
  const uname = req.user.username;
  if (!amount) {
    res.send("amount not to be null")
  }

  USERS.map((user)=> {
    if (user.username == uname) {
      user.balance = user.balance + amount;

      fs.writeFile("./Database/USER.json",
        JSON.stringify(USERS),
        (err)=> {
          if (err) res.send("amount not deposited")

          res.status(200).send("amount deposited")
        })


    }
  })

})


//// amount withdraw route

router.post("/withd", authMiddle, (req, res)=> {

  const amount = parseInt(req.body.amount);
  const uname = req.user.username;
  if (!amount) {
    res.send("amount not to be null")
  }

  USERS.map((user)=> {
    if (user.username == uname) {
      if (amount > user.balance) {
        res.send("not enough balance")
        return;
      }

      user.balance = user.balance - amount

      fs.writeFile("./Database/USER.json",
        JSON.stringify(USERS),
        (err)=> {
          if (err) {
            res.send("amount not withdrawed")}
          res.status(200).send("amount withdrawed")
        })

    }
  })


})



module.exports = router;