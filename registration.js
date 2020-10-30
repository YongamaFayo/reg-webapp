module.exports = function registration(pool) {

    async function regCheck(registration) {
        var check = await pool.query('select registration from registration where registration = $1', registration);
        return check;
    }

    async function getReg() {

        var inserting = await pool.query("select * from registration");
        return inserting;
    }

    async function insertReg(reg) {
        var insert = await pool.query('insert into registration(registration, towns) values ($1, $2)', [reg, 1]);
        return insert;

    }

    
    async function theReg(theRegistration){
        var theRegistration = await regCheck(theReg);
        if(theRegistration.rowCount > 0){
        await PaymentRequestUpdateEvent(theRegistration);
        }
        else {
            await insertReg(theRegistration);
        }
    }

    async function reset(){

        await pool.query('delete from ');
       
       }

    return {
        insertReg,
        getReg,
        regCheck,
        theReg,
        reset
       
    }
}





























// module.exports = function (models) {
//     const showForm = function (req, res, next) {
//         res.redirect('/')
//     }
//     const addFun = function (req, res) {
//         var registration = req.body.name

//         console.log(registration);

//         if (!registration) {
//             res.render('regNum', { reg: registration });
//         } else {
//             models.registrationNames.findOne({
//                 name: req.body.name
//             }, function (err, regResults) {

//                 if (err) {
//                     console.log(err);
//                 }

//                 if (!regResults) {
//                     models.registrationNames.create({
//                         name: req.body.name
//                     }, function (err, results) {
//                         if (err) {
//                             console.log(err)
//                         }

//                         models.registrationNames.find({}, function (err, results) {
//                             if (err) {
//                                 console.log(err);
//                             }
//                             else {
//                                 res.render('regNum', { reg: results });
//                             }
//                         });

//                     })
//                 }

//                 if (regResults) {
//                     req.flash('error', 'registration already exist!');
//                     res.render('regNum');
//                 }
//             });
//         }
//     };


//     var filterData = function (req, res) {
//         var name = req.body.name
//         console.log(name);
//         models.registrationNames.find({ name: { $regex: name } }, function (err, results) {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 res.render("regNum", { reg: results });
//             }
//         })
//     }



//     return {
//         showForm,
//         addFun,
//         filterData
//     };
// }
