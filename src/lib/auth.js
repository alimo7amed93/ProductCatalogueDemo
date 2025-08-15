"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireApiAuth = requireApiAuth;
// APi authentication
function requireApiAuth(req) {
    var auth = req.headers.get("authorization");
    if (!auth || !auth.startsWith("Basic ")) {
        return false;
    }
    var decoded = Buffer.from(auth.split(" ")[1], "base64").toString();
    var _a = decoded.split(":"), user = _a[0], pass = _a[1];
    return (user === process.env.API_USER &&
        pass === process.env.API_PASS);
}
