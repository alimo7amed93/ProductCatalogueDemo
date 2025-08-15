// APi authentication
export function requireApiAuth(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) {
    return false;
  }
  const decoded = Buffer.from(auth.split(" ")[1], "base64").toString();
  const [user, pass] = decoded.split(":");

  return (
    user === process.env.API_USER &&
    pass === process.env.API_PASS
  );
}
