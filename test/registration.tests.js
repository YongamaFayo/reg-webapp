const assert = require('assert');
const registration = require('../registration');
const RegFun = require('../registration')

describe("the registration function", function () {

    const regFun = registration()

    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://yongama:pg123@localhost:5432/registration';
    const pool = new Pool({
        connectionString
    });
    const INSERT_QUERY = "insert into registration (regnumber) values ($1)";

    // beforeEach(async function () {
    //     await pool.query("delete from reg");
    //     await pool.query("delete from towns");
    //     await pool.query(`insert into towns (town, code) values ($1, $2)`, ["Cape town", "CA"])
    //     await pool.query(`insert into towns (town, code) values ($1, $2)`, ["Paarl", "CJ"])
    //     await pool.query(`insert into towns (town, code) values ($1, $2)`, ["Malmersbury", "CK"])
});

it("should be able to add a registration number", async function () {



});

it('should be able to add registration numbers from different towns', async function () {

})

it('should be able to add registration and sort them by a code', async function () {

})

it('should be able to clear the database', async function () {

})


