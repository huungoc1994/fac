module.exports = (app, db, crypto) => {
    // Index
    app.get('/', (req, res) => {
        if (req.session.users) {
            res.redirect('/fac');
        } else {
            res.render('index');
        }
    });

    // App
    app.get('/fac', (req, res) => {
        if (req.session.users) {
            let loginSuccess = req.flash('loginSuccess');
            res.render('fac', {msg: loginSuccess, users: req.session.users});
            console.log(req.session.users);
        } else {
            res.redirect('/');
        }
    });

    // Login
    app.route('/login')
        .get((req, res) => {
            if (!req.session.users) {
                msgSuccess = req.flash('registerSuccess');
                loginError = req.flash('loginError');
                res.render('login', {messageSuccess: msgSuccess, loginError: loginError});
            } else {
                res.redirect('/fac');
            }
        })
        .post((req, res) => {
            let body = req.body;
            let username = body.username,
                pass = crypto.createHash('md5').update(body.password).digest("hex"),
                remember = body.remember;
            db.users.findOne({username: username}, (err, user) => {
                if (err) console.error(err);
                if (!user) {
                    req.flash('loginError', 'Tên đăng nhập không tồn tại');
                    res.redirect('/login');
                } else {
                    if (pass != user.password) {
                        req.flash('loginError', 'Sai mật khẩu');
                        res.redirect('/login');
                    } else {
                        req.flash('loginSuccess', 'Đăng nhập thành công');
                        req.session.users = user;
                        res.redirect('/fac');
                    }
                }
            });
        });

    // Register
    app.route('/register')
        .get((req, res) => {
            let msgError = req.flash('registerError');
            res.render('register', {messageError: msgError});
        })
        .post((req, res) => {
            let body = req.body;
            let username = body.username,
                company = body.company,
                address = body.address,
                email = body.email,
                pass = crypto.createHash('md5').update(body.password).digest("hex"),
                retypepass = crypto.createHash('md5').update(body.confirm_password).digest("hex"),
                gender = body.gender,
                phone = body.tel;

            
            if (pass == retypepass) {
                db.users.findOne({username: username}, (err, user) => {
                    if (err) console.error(err);
                    if (!user) {
                        let newUser = new db.users();
                        newUser.username = username;
                        newUser.company_name = company;
                        newUser.address = address;
                        newUser.email = email;
                        newUser.password = pass;
                        newUser.gender = gender;
                        newUser.phone = phone;
                        newUser.save((err) => {
                            if (err) console.log(err);
                            req.flash('registerSuccess', 'Đăng ký thành công');
                            res.redirect('/login');
                        });
                    } else {
                        req.flash('registerError', 'Tên đăng nhập đã tồn tại');
                        res.redirect('/register');
                    }
                });
            } else {
                req.flash('registerError', 'Nhập lại mật khẩu không đúng');
                res.redirect('/register');
            }
            
        });
}