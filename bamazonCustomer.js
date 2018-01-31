var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "Bamazon"
});

function Purchase (ID, quantity){
    this.ID = ID
    this.quantity = quantity
};

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    connection.query("SELECT * FROM Bamazon.Products", function (err, res) {
        if (err) throw err;
        console.log(res);
        
        inquirer.prompt([
            {
                name: "Product",
                message: "What is the ID of the product you would like to buy?"
            }, {
                name: "Quantity",
                message: "How many units of this product would you like to buy?"

            }
        ]).then(answers => {
            var newPurchase = new Purchase(
                answers.Product,
                answers.Quantity

            )
            console.log(newPurchase);
        });
        connection.end();
    });
}