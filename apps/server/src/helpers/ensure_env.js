let requiredEnvs = [
  {
    name: "NODE_ENV",
    values: ["production", "development"],
    description: "Set to 'production' when running in production",
  },
  {
    name: "DBURL",
    values: ["mongodb://url:port/"],
    description: "Connection string for mongodb database",
  },
  { name: "DBNAME", values: ["dbname"], description: "Database name" },
  {
    name: "COOKIE_SECRET",
    values: ["secret"],
    description: "Secret for signing cookies. Password like random string.",
  },
  { name: "PORT", values: ["port"], description: "Port to listen to" },
  {
    name: "NGINX_ENABLED",
    values: ["true", "false"],
    description: "Set to 'true' when running in production with nginx",
  },
  {
    name: "REDIS_PASSWORD",
    values: ["password"],
    description: "Password for redis",
  },
];

for (let env of requiredEnvs) {
  if (!process.env[env.name]) {
    console.log("ERROR:");
    console.log(`Environment variable: ${env.name} is not set`);
    console.log(`Description of ${env.name}: ${env.description}`);
    console.log(`Possible values: ${env.values}`);
    console.log("Exiting...");
    process.exit(1);
  }
}

console.log("ALL ENVIROMENT VARIABLES ARE SET");
