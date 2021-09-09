import Auth from "../db/models/users.model";
import Helper from "../utils/user.utils";
import AuthServices from "../services/auth.services";

/**
 *Contains Auth Controller
 *
 *
 *
 * @class AuthController
 */
class AuthController {
  /**
   * Create account for a user.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async signUp(req, res) {
    try {

      const { fullName, password, email } = req.body;
           
      const encryptpassword = await Helper.encrptPassword(password);

      const newUser = {
        fullName,
        password: encryptpassword,
        email       
      };
      const result = await Auth.create(newUser);      
      const token = await Helper.generateToken(result._id,email,fullName);    

      return res.status(201).json({
        status: "success",
        data: {
          token,
          user:result,
        },
      });
    } catch (err) {     
        console.log(err)
      return res.status(500).json({
        status: "500 Internal server error",
        error: "Error creating new user",
      });
    }
  }

  /**
   * Login user.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthServices.emailExist(email, res);      

      const confirmPassword = await Helper.verifyPassword(
        password,
        user.password
      );

      if (!confirmPassword || !user) {
        return res.status(401).json({
          status: "401 Unauthorized",
          error:
            "Invalid Login details.",
        });
      }

      const token = await Helper.generateToken(
        user.id,
        user.email,
        user.fullName
      );

      return res.status(200).json({
        status: "success",
        data: {
          token,
          user,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: "500 Internal server error",
        error:
          "Error logging in user",
      });
    }
  }

  
}
export default AuthController;
