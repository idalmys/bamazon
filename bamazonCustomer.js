const inquirer= require("inquirer");
const db=require("./database");

function Start(){
   ShowData();
    inquirer
    .prompt([
    {
        type: "input",
        name: "product_id",
        message: "ID of the product would like to buy"

        
    },
    {
        type: "input",
        name: "quantity",
        message: "How many units of the product would like to buy ?"

        
    }

])
.then(answers=>{
 var id= answers.product_id;
 var quantity=answers.quantity;
 db.query("select product_id as ID, product_name as Product, price as Price, stock_quantity as Quantity from products  where product_id =? and stock_quantity > ?",[id,quantity],(err,res)=>{
     if(err){
         throw err;
     }else{
         console.log(res);
         
        
     }

 })
})
}
function ShowData(){
    db.query("select product_id as ID, product_name as Product, price as Price from products",(err,res)=>{
        if(err) throw err;
        for(var i=0; i<res.lenght;i++){
                
            console.log("ID : " + res[i].ID +"|" + "Product : " + res[i].Product + " |" + "Price : " + res[i].price + " |"  );
            
           
        }
        
    });
}
Start();