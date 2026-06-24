import { User } from "../models/user.model.js";

export const pdfLimitMiddleware = async (req, res, next) => {
    try{
      const user = await User.findById(req.user._id);
      const now = new Date();
      const lastReset = new Date(user.pdfCountResetDate);
      const diff= now.getTime()-lastReset.getTime();

      const oneDay =24 * 60 * 60 * 1000;// in milisec


      if(diff>=oneDay){
        user.pdfGenerationCount = 0;
        user.pdfCountResetDate = now;
        await user.save();
      }

      if (user.pdfGenerationCount >= 10) {
        return res.status(429).json({
                success: false,
                message:
                    "Daily PDF generation limit exceeded"
        });
      }
      next();

    }
    catch(error){
      next(error);
    }
};