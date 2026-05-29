// asyncHandler is a higher-order function
// It wraps async route handlers to automatically catch errors

const asyncHandler = (requestHandler) => {
    
    return (req, res, next) => {

        Promise
            .resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
    }
}

export { asyncHandler }