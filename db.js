const MongoClient=require("mongodb").MongoClient;
const employeedata=require("./employee.json");
const connectionString="mongodb://localhost:27017/human_resources";

MongoClient.connect(connectionString, async (err, db) => 
{if (err) {
    console.error("Error while connecting", err)
    return}
    const database = db.db("Human_Resoure")
    const dbCollection = database.collection("employee")

    console.log("Connected to Mongo Database")

    const inserting = await dbCollection.insertMany(employeeData)
    console.log(inserting)

    const finding = await dbCollection.find().toArray()
    console.log(finding)
    console.log("showing all data")

    const findSalary = await dbCollection.find({"salary":{$gt:"30000"}}).toArray()
    console.log(findSalary)
    console.log("showing all data those salary greater than 30000")

    const findExp = await dbCollection.find({"overallExp":{$gt:"2"}}).toArray()
    console.log(findExp)
    console.log("showing all data those experience greater than 2")

    const gradExp = await dbCollection.find({$and:[{"yearGrad":{$gt:"2015"}},{"overallExp":{$gt:"1"}}]}).toArray()
    console.log(gradExp)
    console.log("showing all data those graduated after 2015 and having exp greater than 1 ")

    const updating = await dbCollection.updateMany({salary: {$gt:70000}},{$set: {salary: 65000}})
    console.log(updating)

    const deleting = await dbCollection.deleteMany({lastCompany: "Y" })
    console.log(deleting)

})