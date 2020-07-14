const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log("Enter the password")
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://FullStack:${password}@cluster0.5it6a.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const personSchema = mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length > 4) {
  const newPerson = new Person({
    id: Math.floor(Math.random() * 1000000),
    name: process.argv[3],
    number: process.argv[4],
  })
  
  newPerson.save().then(result => {
    mongoose.connection.close()
  })
}


Person.find({}).then(result => {
  console.log("phonebook:")
  result.forEach(person => {
    console.log(`${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})


