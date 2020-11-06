module.exports = function registration(pool) {

    async function regCheck(registration) {
        var check = await pool.query('select registration from regNumber where reg = $1', [registration]);
        return check;
    }

    async function plateNumber(x) {
        //const item = await pool.query(`select id from reg where plate = $1`[x])

        const code = x.substring(0, 2)
        const theId = await pool.query(`select id from towns where registration = $1`, [code])
        const id = theId.rows[0].id

        let checking
        if (id > 0) {
            checking = await pool.query(`select * from regnumber where reg = $1`, [x])
        } else {
            return false
        }

        if (checking.rowCount === 0) {
            await pool.query(`insert into regnumber (reg, townsid) values ($1, $2)`, [x, id])
        }
    }

    async function insertReg(reg) {
        var code = reg.substring(0,2)
        var theId= await pool.query(`select id from towns where registration = $1`,[code])
        var id = theId.rows[0].id
        var insert = await pool.query('insert into regNumber(reg, townsid) values ($1, $2)', [reg, id]);
        
        
        return insert;
        


    }

    async function getReg() {
        var inserting = await pool.query(`select reg from regNumber`);
        return inserting.rows;
    }




    async function theReg(theRegistration) {
        var theRegistration = await regCheck(theReg);
        if (theRegistration.rowCount > 0) {
            await PaymentRequestUpdateEvent(theRegistration);
        }
        else {
            await insertReg(theRegistration);
        }
    }

    async function filter(code) {
        
        if (code == "all") {
            const filtering = await pool.query(`select reg from regNumber`)
            return filtering.rows
        } else {
            const theId = await pool.query(`select id from towns where registration = $1`, [code])
            const id = theId.rows[0].id
            

            const place = await pool.query(`select * from regNumber where townsid = $1`, [id])
            return place.rows
        }

    }


    async function reset() {

        await pool.query('delete from regNumber');

    }

    return {
        insertReg,
        plateNumber,
        getReg,
        regCheck,
        theReg,
        reset,
        filter

    }
}





