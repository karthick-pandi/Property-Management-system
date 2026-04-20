// config/data-source.ts
import { DataSource } from "typeorm";
import { User } from "../Entity/User";
import { RentalAgreement } from "../Entity/Rentalagreement";
import { RentalCancellation } from "../Entity/RentalCancellation";
import { LeaseCancellation } from "../Entity/LeaseCancellation";
import { LeaseAgreement } from "../Entity/LeaseAgreement";

export const AppDataSource = new DataSource({
  type:        "mysql",
  host:        "localhost",
  port:        3306,
  username:    "root",
  password:    "",         
  database:    "pms_db",
  synchronize: true,
  logging:     false,
  entities:    [User, RentalAgreement, RentalCancellation, LeaseAgreement, LeaseCancellation],

  extra: {
    connectionLimit: 10,
    connectTimeout:  60000,   
  },
});