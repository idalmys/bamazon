const inquirer= require("inquirer");
const db=require("./database");

var quantity;
var id;
function Start(){
    quantity=0;
    db.query("select product_id as ID, product_name as Product, price as Price from products",(err,res)=>{
        if(err) throw err;
        if(res.length > 0){
                for(var i = 0; i < res.length; i++){
                    console.log("ID: " + res[i].ID + " | Product: " + res[i].Product + " | Price: " + res[i].Price);
                }

            inquirer
            .prompt([
            {
                type: "input",
                name: "product_id",
                message: "ID of the product would you like to buy"  
            }
           
            ])
            .then(answers =>{
                id=answers.product_id;
                               
                db.query("select product_id as ID from products  where product_id = ? ;",[id],(err,res)=>{
                    if(res.length > 0){
                        inquirer
                        .prompt([{
                            type: "input",
                            name: "quantity",
                            message: "How many units of the product would you like to buy ?" 
                        }])
                        .then(answers=>{
                            quantity=answers.quantity;
                           
                            db.query("select stock_quantity as Quantity , product_name as Product, price as Price from products  where product_id =? ",[id],(err,res)=>{
                            if(err) throw err;
                                if(res[0].Quantity < quantity){
                                        console.log("Insuficients Products");
                                        Start();
                                }
                                else{
                                    var total =(res[0].Price * quantity); 
                                    var checkout= (res[0].Quantity - quantity);

                                    var invoice= "\n.......Invoice.............\n" + 
                                        "\n Producto: "+ res[0].Product + 
                                        "\n Price $: " +res[0].Price + 
                                        "\n Quantity: " + quantity +
                                        "\n Total: $ " + total +
                                        "\n.......End Invoice.............\n"
                                        console.log(invoice);

                                    db.query(" UPDATE products SET stock_quantity = ? , product_sale= ?  WHERE product_id  = ?",
                                        [checkout,total,id],(err,res)=>{       
                                        if(err) throw err;
                                       
                                            if(res.affectedRows > 0){
                                            console.log("Your order has been placed successfully!");
                                       
                                        } 

                                        Start();

                                    })                          
                                
                                }
                                
    
                            })
                        })

                    } else {
                        console.log(" Incorrect ID");
                        Start();
                    }
                    

                })

 
            })

        }
    })

}
Start();

