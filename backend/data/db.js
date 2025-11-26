import { Sequelize } from "sequelize";


const sequelize = new Sequelize({
    dialect: "sqlite",
    logging: console.log ,
    storage: "./data/database.sqlite"
});

export default sequelize;