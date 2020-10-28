module.exports = function (models) {
    const showForm = function (req, res, next) {
        res.redirect('/')
    }
    const addFun = function (req, res) {
        var regNumber = req.body.name

        console.log(regNumber);

        if (!regNumber) {
            res.render('regNum', { reg: regNumber });
        } else {
            models.registrationNames.findOne({
                name: req.body.name
            }, function (err, regResults) {

                if (err) {
                    console.log(err);
                }

                if (!regResults) {
                    models.registrationNames.create({
                        name: req.body.name
                    }, function (err, results) {
                        if (err) {
                            console.log(err)
                        }

                        models.registrationNames.find({}, function (err, results) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                res.render('regNum', { reg: results });
                            }
                        });

                    })
                }

                if (regResults) {
                    req.flash('error', 'registration already exist!');
                    res.render('regNum');
                }
            });
        }
    };


    var filterData = function (req, res) {
        var name = req.body.name
        console.log(name);
        models.registrationNames.find({ name: { $regex: name } }, function (err, results) {
            if (err) {
                console.log(err)
            }
            else {
                res.render("regNum", { reg: results });
            }
        })
    }



    return {
        showForm,
        addFun,
        filterData
    };
}
