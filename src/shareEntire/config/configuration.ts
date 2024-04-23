import * as dotenv from 'dotenv';
dotenv.config();

interface Configuration {
  api: {
    port: number;
    accessJwtSecretKey: string;
    accessTokenExpireInSec: number;
    refreshTokenExpireInSec: number;
  };
}

export default (): Configuration => ({
  api: {
    port: parseInt(process.env.API_PORT, 10) || 3000,
    accessJwtSecretKey: process.env.ACCESS_JWT_SECRET_KEY || '',
    accessTokenExpireInSec: parseInt(
      process.env.ACCESS_TOKEN_EXPIRE_IN_SEC,
      10,
    ),
    refreshTokenExpireInSec: parseInt(
      process.env.REFRESH_TOKEN_EXPIRE_IN_SEC,
      10,
    ),
  }
});