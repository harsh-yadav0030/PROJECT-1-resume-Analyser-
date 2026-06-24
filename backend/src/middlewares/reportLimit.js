export const reportLimit = async (req, res, next) => {
    try {

        const user = req.user;

        const now = new Date();

        const lastReset = new Date(user.reportCountResetDate);

        const oneDay = 24 * 60 * 60 * 1000;

        if (now - lastReset >= oneDay) {
            user.reportGenerationCount = 0;
            user.reportCountResetDate = now;

            await user.save();
        }

        if (user.reportGenerationCount >= 5) {
            return res.status(429).json({
                success: false,
                message: "Daily report generation limit exceeded."
            });
        }

        next();

    } catch (error) {
        next(error);
    }
};