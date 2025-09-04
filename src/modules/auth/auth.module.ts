{
  "imports": [
    "../users/users.module",
    "@nestjs/jwt/JwtModule.registerAsync({
      "imports": ["@nestjs/config"],
      "useFactory": async (configService) => ({
        "secret": configService.get<string>('JWT_SECRET'),
        "signOptions": {
          "expiresIn": configService.get<string>('JWT_EXPIRES_IN')
        }
      }),
      "inject": ["@nestjs/config/ConfigService"]
    })"
  ],
  "controllers": [
    "./auth.controller"
  ],
  "providers": [
    "./auth.service",
    "./jwt.strategy",
    {
      "provide": 'UserRepository',
      "useExisting": 'AuthRepository'
    }
  ]
}