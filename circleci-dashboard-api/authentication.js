function authenticateFromCookie(cookies) {
    const token = cookies["circleci-api-token"];
    const error = (res) => res.status(403).send({message: "Api Token not found"})
    return {
        token,
        success: !!token,
        error
    }
}

exports.authenticate = authenticateFromCookie;