const inquirer= require("inquirer");
const db=require("./database");

function Start(){
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
            },
            {
                 type: "input",
                 name: "quantity",
                 message: "How many units of the product would you like to buy ?"

        
             }
            ])
            .then(answers =>{
                var id=answers.product_id;
                var quantity=answers.quantity;
                
                db.query("select product_id as ID from products  where product_id = ? ;",[id],(err,res)=>{
                    if(res.length > 0){
                        db.query("select stock_quantity as Quantity from products  where product_id =? ",[id],(err,res)=>{
                            if(err) throw err;
                                 if(res[0].Quantity < quantity){
                                        console.log("Insuficients Products");
                            }
                                console.log(res[0].Quantity);
                    Start();
        
        
                })
                    } else {console.log(" Incorrect ID")
                Start();}
                    

                })

                






    })

  }
})

}



Start();