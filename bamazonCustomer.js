var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "password",

    database: "bamazondb"
});

connection.connect(function (err) {
    if (err) throw err;

    start();
});


function start() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        // makes an array of the items in the database and displays as list of items + price
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which item would you like to purchase?"
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many of this item do you need?"
                }
            ])
            .then(function(order) {
                // create a variable to hold the user's choice
                var chosenItem;
                // // setting the var to = the result index if the user choice = product name
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === order.choice) {
                        chosenItem = res[i];
                    }
                }
                // determine if there is sufficient quantity
                if (parseInt(order.amount) < chosenItem.stock_quantity) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: (chosenItem.stock_quantity - order.amount)
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                        ],
                        function (err) {
                            if (err) throw err;
                            console.log("Your total cost is: $" + (chosenItem.price * order.amount));
                            start();
                        }
                    );
                    }
                else {
                    console.log("There is not enough of that item in stock. Please adjust your amount or choose a differnt item.");
                    start();
                }
            });
    });
}