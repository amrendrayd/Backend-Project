import {asyncHaldler} from "../utils/asyncHandler.js";

const registerUser = asyncHaldler (async (req, res) => {
    res.status(200).json({
        message: "ok"
    })
})

export {registerUser}