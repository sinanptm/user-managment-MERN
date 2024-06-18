import asyncHandler from 'express-async-handler';


const authUser = asyncHandler(async (req, res) => {
    res.status(400)
    throw new Error('Something went wrong ')
})


export {
    authUser
}