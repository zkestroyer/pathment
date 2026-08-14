// Create and send token and save in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION", // true in production
    sameSite: "strict",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

const sendShopToken = (shop, statusCode, res) => {
  const token = shop.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "PRODUCTION", // true in production
    sameSite: "strict",
  };

  res.status(statusCode).cookie("seller_token", token, options).json({
    success: true,
    shop,
    token,
  });
};

module.exports = { sendToken, sendShopToken };
