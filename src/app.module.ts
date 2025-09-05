{
  "imports": [
    {
      "name": "ConfigModule",
      "forRoot": true,
      "load": [
        () => ({
          DB_HOST: process.env.DB_HOST,
          DB_PORT: parseInt(process.env.DB_PORT, 10) || 5432,
          DB_USERNAME: process.env.DB_USERNAME,
          DB_PASSWORD: process.env.DB_PASSWORD,
          DB_NAME: process.env.DB_NAME
        })
      ]
    },
    {
      "name": "TypeOrmModule",
      "forRoot": {
        "type": "postgres",
        "host": process.env.DB_HOST,
        "port": Number(process.env.DB_PORT) || 5432, // Ensure DB_PORT is a number
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_NAME,
        "entities": [
          "src/modules/**/entities/*.entity.ts"
        ],
        "synchronize": true,
        "autoLoadEntities": true
      }
    },
    "src/modules/admin/admin.module.ts",
    "src/modules/application/application.module.ts",
    "src/modules/auth/auth.module.ts",
    "src/modules/users/users.module.ts",
    "src/modules/community/community.module.ts",
    "src/modules/matching/matching.module.ts",
    "src/modules/notification/notification.module.ts",
    "src/modules/profile/profile.module.ts",
    "src/modules/reservation/reservation.module.ts"
  ],
  "controllers": [],
  "providers": []
}