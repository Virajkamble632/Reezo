import User from '../models/User.js';
import genrateToken from '../utils/genrateToken.js';
import crypto from "crypto";
import sendEmail from '../utils/sendEmail.js';
import { measureMemory } from 'vm';

//Register User
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async(req, res) => {
    try{
        const { name, email, password } = req.body;

        //Check All Fields
        if(!name || !email || !password ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Create new User
        const user = await User.create({
            name,
            email,
            password,
        });

        // Generate JWT
        const token = genrateToken(user._id);

        // Store JWT in HTTP-Only cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
        })

        res.status(201).json({
            success: true,
            message: "Registration Successfull",
            token: genrateToken(user._id),
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch(error){
        console.log("REgister error", error);
        res.status(500).json({
            success: false,
            message: error.message,
            stack: error.stack
        });
    };
}

//Login User
// @route POST /api/auth/login
// @access Public
export const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({ email });

        if(!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = genrateToken(user._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,                                      
                },
        });

    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// Forgot password
// @route 
// @access Public
export const forgotPassword = async (req, res) => {
    try{
        const { email } = req.body;

        // check if mail is entered
        if(!email){
            return res.status(400).json({
                success: false,
                message: "Please enter your email",
            });
        }

        // Find user
        // const user = await User.findOne({ email });
        console.log("Email received:", email);

        const allUsers = await User.find();

        console.log("All Users:", allUsers);

        const user = await User.findOne({
        email: email.trim().toLowerCase(),
        });

        console.log("User Found:", user);


        // Genrate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        //Save Hashed token
        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex")

        //Token Expiry (15 Minutes)
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save({validateBeforeSave: false,});

        // Reset URL
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        // Email HTML
        const message = `
            <div style="font-family:Arial;padding:30px">
                <h2>Reset Your Reezo Password</h2>

                <p>You requested to reset your password.</p>

                <p>Click the button below.</p>

                <a
                href="${resetUrl}"
                style="
                background:#2563EB;
                color:white;
                padding:12px 25px;
                text-decoration:none;
                border-radius:8px;
                display:inline-block;
                "
                >
                Reset Password
                </a>

                <p style="margin-top:25px">
                This link will expire in 15 minutes.
                </p>

                <p>If you didn't request this, ignore this email.</p>

            </div>
        `;

        await sendEmail({
            email: user.email,
            subject: "Reezo Password Reset",
            message,
        });

        return res.status(200).json({
            success: true,
            message: "Password reset email send successfully.",
        });

    } catch(error){
       return res.status(500).json({
            success: false,
            message: error.message,
       });
    };
}

// Reset password
// @route 
// @access Public
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    // Check password
    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Please enter a new password.",
      });
    }

    // Hash token from URL
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Reset token is invalid or has expired.",
      });
    }

    // Update password
    user.password = password;

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // Save user (password will be hashed automatically)
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });

  } catch (error) {

  console.log("Error:", error);

  console.log("Response:", error.response);

  console.log("Response Data:", error.response?.data);

  toast.error(
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );

}
};

// @desc    Get Profile
// @route  GET /api/auth/profile
// @access  Private
export const getProfile = async(req, res) => {
    try{
        const user = await User.findById(req.user._id).select("-password");

        res.status(200).json({
            success: true,
            user,
        });

    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// @desc    Logout User
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = async(req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false, // Change to true in production
        sameSite: "lax",
    });    

    res.status(200).json({
        success: true,
        message: "Logged out Successfully",
    });
}