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

function checkQuantity(answers, item){
    if(answers.Quantity <= item.Stock_Quantity){
        console.log("You're in luck! Your product is in stock!")
    }else if(answers.Quantity > item.Stock_Quantity){
        console.log("Sorry, our stock can not meet your needs.")
    }

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
                type: "input",
                name: "Product",
                message: "What is the ID of the product you would like to buy?"
            }, {
                type: "input",
                name: "Quantity",
                message: "How many units of this product would you like to buy?"

            }

        ]).then(function(answers){
            for(var i=0; i<res.length; i++){
                if (res[i].Item_ID == answers.Product){
                    var item = res[i];
                    return checkQuantity(answers, item);

                }
            }

            var newPurchase = new Purchase(
                answers.Product,
                answers.Quantity
                
            )
            
            console.log(newPurchase);
        });
        connection.end();
    });
}