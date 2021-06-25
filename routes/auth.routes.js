const { Router } = require("express")
const User = require("../models/User")
const router = new Router()
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")
const Item = require("../models/Item")
const Comment = require("../models/comment")
const { check, validationResult } = require("express-validator")
const authMiddleware = require("../middleware/auth")

router.post("/registration",
    [
        check("email", "некоректный email").isEmail(),
        check("password", "минимум 6 символов").isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const {
                email,
                password,
                name,
            } = req.body

            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: "uncorrect request",
                    error
                })
            }

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: `user with email ${email} already exist` })
            }

            const hashedPassword = await bcrypt.hash(password, 7)

            const user = new User({
                name,
                email,
                password: hashedPassword,
            })

            await user.save()

            return res.json({ message: "User was created" })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })




router.post("/login",
    async (req, res) => {

        const { email, password } = req.body

        try {

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({ message: "user not found" })
            }

            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({ message: "Invalid password" })
            }

            const items = await Item.find();

            const users = await User.find();

            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                token,
                items: items,
                users: users,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    files: user.files,
                    followersItem: user.followersItem,
                    subscribe: user.subscribe,
                    role: user.role,
                }
            })



        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    }
)




router.post(`/delItem`,

    async (req, res) => {

        const { id, currentId } = req.body

        const item = await Item.findOne({ _id: id })

        await item.remove()

        const user = await User.findOne({ _id: currentId })

        const items = await Item.find();

        try {

            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                token,
                users: [],
                items: items,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    files: user.files,
                    followersItem: user.followersItem,
                    subscribe: user.subscribe,
                    role: user.role,
                },
                message: "Item is delete"
            })


        } catch (error) {

            res.send({ message: error })

        }
    }
)




router.get("/auth", authMiddleware,
    async (req, res) => {

        const user = await User.findOne({ _id: req.user.id })

        const users = await User.find()

        const items = await Item.find();


        try {
            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                users: users,
                items: items,
                token,
                user: {
                    role: user.role,
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    postsId: users.postsId,
                    subscribe: user.subscribe,
                    files: user.files,
                }
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })


router.get("/sortWord", authMiddleware,
    async (req, res) => {

        const user = await User.findOne({ _id: req.user.id })
        const users = await User.find()
        const arr = await Item.find()
        const items = arr.sort((a, b) => a.name > b.name ? 1 : -1);


        try {
            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                users: users,
                items: items,
                token,
                user: {
                    role: user.role,
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    postsId: users.postsId,
                    subscribe: user.subscribe,
                    files: user.files,
                }
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })



router.get("/sortCount", authMiddleware,
    async (req, res) => {

        const user = await User.findOne({ _id: req.user.id })
        const users = await User.find()
        const arr = await Item.find()
        const items = arr.sort((a, b) => a.count - b.count);

        try {
            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                users: users,
                items: items,
                token,
                user: {
                    role: user.role,
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    postsId: users.postsId,
                    subscribe: user.subscribe,
                    files: user.files,
                }
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })





router.post("/update",
    async (req, res) => {

        const { name, id, currentId } = req.body

        const changUser = await Item.findOne({ _id: id })

        await Item.updateOne(changUser, { name: name })



        const user = await User.findOne({ _id: currentId })
        const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

        try {

            const items = await Item.find();

            return res.json({
                token,
                users: [],
                items: items,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    files: user.files,
                    followersItem: user.followersItem,
                    subscribe: user.subscribe,
                    role: user.role,
                },
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    }
)



router.post("/comments",
    async (req, res) => {

        const { id, productId, description, data } = req.body

        const user = await User.findOne({ _id: id })

        const author = user.name.toString()

        const comment = await new Comment({ productId, description, data, author })

        await comment.save()

        const product = await Item.findOne({ _id: productId })

        const comments = await Comment.find();

        const result = comments.filter(item => item.productId === productId)

        await Item.updateOne(product, { 'comments': result })

        const items = await Item.find();


        try {

            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                token,
                items: items,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    files: user.files,
                    followersItem: user.followersItem,
                    subscribe: user.subscribe,
                    role: user.role,
                },
                message: `User criate new  ${user.name} `
            })

        } catch (error) {
            console.log(error)
            res.send({ message: "Server error" })
        }
    })



module.exports = router

