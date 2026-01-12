import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    // const { userId } = req.body;
    // const { email } = req.body;
    const userId = req.userId;

    if (!userId) {
      // This block handles cases where the middleware failed to attach data
      // but somehow called next(), or if the token was for an invalid user.
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Missing user ID in request.",
      });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        // Use 404 (Not Found) for better status code
        success: false,
        message: "User data not found in database.",
      });
    }

    return res.json({
      success: true,
      userData: {
        email: user.email,
        name: user.name,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);

    return res.status(500).json({
      // Use 500 for server errors
      success: false,
      message: "Server error while fetching user data.",
    });
  }
};
