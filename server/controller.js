const houses = require('./db.json')
let globalId = 4

module.exports = {
    getHouses: (req,res)=>{
        res.status(200).send(houses)
    },
    deleteHouse: (req,res)=>{
        const {id} = req.params
        let index = houses.findIndex((house)=>{
            return house.id === +id
        })
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req,res)=>{
        let {address, price, imageURL} = req.body 
        const newHouse = {
            id: globalId,
            address: address,
            price: price,
            imageURL: imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        globalId++
    },
    updateHouse: (req,res)=>{
        let {id} = req.params
        let {type} = req.body
        let index = houses.findIndex(e=>e.id === +id)//makes it a interger
        if(houses[index].price <= 10000 && type === 'minus'){
            res.status(400).send("The house can't be free")
        }else if(type === "plus"){
            houses[index].price += 10000
            res.status(200).send(houses)
        }else if(type === 'minus'){
            houses[index].price -= 10000
            res.status(200).send(houses)
        }else 
        res.status(400).send('Something is wrong here')
    }
}