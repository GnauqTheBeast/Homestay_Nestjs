import * as jwt from 'jsonwebtoken';
import configuration from '../config/configuration';

export const generateToken = (payload, option={}) => {
    const secret = configuration().api.accessJwtSecretKey;
    return jwt.sign(payload, secret, option);
}

export const verifyRefreshJWT = (tokenOld, option={}) => {
    const secret = configuration().api.accessJwtSecretKey;
    return jwt.verify(tokenOld, secret, option);
};
  