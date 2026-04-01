// config/data-source.ts
import { DataSource } from "typeorm";
import { User } from "../Entity/User";

export const AppDataSource = new DataSource({
  type:        "mysql",
  host:        "localhost",
  port:        3306,
  username:    "root",
  password:    "",         // உங்கள் MySQL password
  database:    "pms_db",
  synchronize: true,
  logging:     false,
  entities:    [User],

  extra: {
    connectionLimit: 10,
    connectTimeout:  60000,   // ✅ இது மட்டும் valid
  },
});