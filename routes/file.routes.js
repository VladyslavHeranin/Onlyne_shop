const { Router } = require('express')
const router = new Router()
const Item = require("../models/Item")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const config = require("config")


router.post("/groups",
    async (req, res) => {

        const { id, name, imgURL, size, weidht, count, discription } = req.body

        const post = new Item({ name, imgURL, size, weidht, count, discription })

        await post.save()

        const items = await Item.find();

        const users = await User.find();

        const user = await User.findOne({ _id: id })

        try {

            const token = jwt.sign({ id: user.id }, config.get("key"), { expiresIn: "1h" })

            return res.json({
                token,
                users: users,
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