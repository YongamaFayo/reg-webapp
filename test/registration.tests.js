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

    beforeEach(async function () {
        await pool.query("delete from reg");
        await pool.query("delete from towns");
        await pool.query(`insert into towns (town, code) values ($1, $2)`, ["Cape town", "CA"])
        await pool.query(`insert into towns (town, code) values ($1, $2)`, ["Paarl", "CJ"])
        await pool.query(`insert into towns (town, code) values ($1, $2)`, ["Malmersbury", "CK"])
});

it("should be able to add a registration number", async function () {
    await regFun.plateNumber("CA 12345")

    const results = await pool.query("select count(*) from reg");
    
    
    assert.equal(1, results.rows[0].count);


});

it('should be able to add registration numbers from different towns', async function () {
    await regFun.plateNumber("CJ 321654")
		await regFun.plateNumber("CA 123456")

		const results = await regFun.getPlates()
		
		await assert.deepEqual([{reg_numb: 'CJ 321654'},{reg_numb: 'CA 123456'}], results)
})

it('should be able to add registration and sort them by a code', async function () {
    await regFun.plateNumber("CJ 321654")
        await regFun.plateNumber("CA 123456")
        await regFun.plateNumber("CA 123565")
		

		const results = await regFun.sort('CJ')
		const result = results[0].reg_numb

		await assert.equal('CJ 321654', result)
})

it('should be able to clear the database', async function () {
    await regFun.plateNumber("CJ 321654")
        await regFun.plateNumber("CA 123456")
        await regFun.plateNumber("CJ 321654")
        await regFun.plateNumber("CA 123456")
        
		await regFun.clear()

		const results = await pool.query("select count(*) from reg");

		await assert.deepEqual(0, results.rows[0].count)
	})
})


