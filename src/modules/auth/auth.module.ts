{
  "imports": [
    "../users/users.module",
    "@nestjs/jwt",
    "@nestjs/config"
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