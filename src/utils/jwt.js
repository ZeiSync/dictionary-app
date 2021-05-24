class JWTHelper {
  static getToken(req) {
    let authorization = null;
    let token = null;
    if (req.query && req.query.token) {
      return req.query.token;
    }
    if (req.authorization) {
      authorization = req.authorization;
    } else if (req.headers) {
      authorization = req.headers.authorization;
    } else if (req.socket) {
      if (req.socket.handshake.query && req.socket.handshake.query.token) {
        return req.socket.handshake.query.token;
      }
      authorization = req.socket.handshake.headers.authorization;
    }
    if (authorization) {
      const tokens = authorization.split('Bearer ');
      if (Array.isArray(tokens) || tokens.length === 2) {
        [, token] = tokens;
      }
    }
    return token;
  }
}

module.exports = JWTHelper;
