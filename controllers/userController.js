const getUsers = (req, res) => {
  res.json({
    message: "Get all users API"
  });
};

const createUser = (req, res) => {
  res.json({
    message: "Create user API",
    data: req.body
  });
};

module.exports = { getUsers, createUser };
