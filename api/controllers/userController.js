const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")
const { User } = require("../data");

const baseURL = `${process.env.BASE_URL}`

module.exports = {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!email) {
                return res.status(400)
                    .json({ error: 'Missed mandatory field: email' });
            }
            if (!password) {
                return res.status(400)
                    .json({ error: 'Missed mandatory field: password' });
            }
            const hasValidPassword = await bcrypt.compare(password, user.password);

            if (hasValidPassword) {
                const token = jwt.sign(email, process.env.JWT_SECRET);
                return res.status(200).json({ token, email: email });
            }
            return res
                .status(401)
                .json({ error: "Incorrect email or password" });

        } catch (err) {
            console.log(err)
            return res
                .status(401)
                .json({ error: "Incorrect email or password" });
        }
    },

    async register(req, res) {
        let { email, password } = req.body
        if (!email) {
            return res.status(400)
                .json({ error: 'Missed mandatory field: email' });
        }
        if (!password) {
            return res.status(400)
                .json({ error: 'Missed mandatory field: password' });
        }
        const hashed = bcrypt.hashSync(password, 10)
        try {
            const resultUser = await User.findOne({ email: email });
            if (resultUser !== null) {
                return res.status(409)
                    .json({ error: 'Username already in use' });
            }
            const user = await User.create({
                email: email,
                password: hashed,
            });
            user.save();
            const token = jwt.sign(user.email, process.env.JWT_SECRET);
            return res.json({ token, email: user.email });
        } catch (error) {
            return res
                .status(500)
                .json({ error: 'Something happened ' + error });
        }
    },

    async update(req, res) {
        const { email, password, newPassword } = req.body;
        const hashed = bcrypt.hashSync(newPassword, 10)

        if (email == "" || newPassword == "") {
            return res
                .status(400)
                .json({ message: "All fields are required" });
        }

        try {
            let foundUser = await User.findOne({ email: email });
            if (foundUser == null) {
                return res.status(404).json({ message: `No contact with: ${email}` });
            }
            // check for null values
            if (password == foundUser.password) {
                foundUser.password = hashed;
                foundUser.save()
                const token = jwt.sign(email, process.env.JWT_SECRET);
                return res.status(200).json({ token, email: email });

            } else {
                return res.status(401).json({ error: "Invalid credentials" });

            }
        } catch (error) {
            return res
                .status(500)
                .json({ error: 'Something happened al final' + error });
        }
    },

    async recoveryPassword(req, res) {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            service: "Outlook365",
            host: "smtp-mail.outlook.com",
            port: "587",
            tls: {
                ciphers: "SSLv3",
                rejectUnauthorized: false,
            },
            auth: {
                user: "nowportsnotreplay@outlook.es",
                pass: "w)kEb9PHLy,zV.g",
            },
        });

        const email = req.body.email
        if (!email) {
            return res.status(400)
                .json({ error: 'Missed mandatory field: email' });
        }
        let resultUser, encryptedPassword;

        try {
            resultUser = await User.findOne({ email: email });
            encryptedPassword = resultUser.password.replace(/\//g, '%2F');
            if (resultUser == null) {
                return res.status(404)
                    .json({ error: 'Email not in the system' });
            }
        } catch (error) {
            return res
                .status(500)
                .json({ error: 'Something happened ' + error });
        }
        let emailText = `Hi ${email}!
      
      In order to recover your access to PhoneBook by NowPorts, you have to follow the next link, and set your new password.
      
      ${baseURL}/passwordRecovery/${encryptedPassword}, ${email}
      
      Best Regards!,
      Mathias, NowPorts, Support Team.
      `
        let info = await transporter.sendMail({
            from: "nowportsnotreplay@outlook.es", 
            to: email,
            subject: "Recover your account!",
            text: emailText, 
        }, function (error, info) {
            if (error) {
                return res.status(500).json({ error: `Internal error, email was not sent` });
            } else {
                return res.status(201).json({ message: `Email sent, hope to see you back soon!` });
            }
        });
    }
}
    ;
