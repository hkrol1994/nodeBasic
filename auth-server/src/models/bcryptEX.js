const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const password = "mypassword123";

const hashPassword = async (password) => {
  const hashPass = await bcrypt.hash(password, 8);
  //   console.log(hashPass);

  const isMatch = await bcrypt.compare(password, hashPass);
  console.log(isMatch);
};

// hashPassword(password).then();

const func = () => {
  const token = jwt.sign(
    {
      _id: "kkjlkjlk",
    },
    "thisismysecret",
    {
      expiresIn: "6h",
    }
  );
  console.log(token);

  const data = jwt.verify(token, "thisismysecret");
  console.log(data);
};
func();
