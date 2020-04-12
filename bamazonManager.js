const inquirer=require("inquirer");
const db=require("./database");
var pname;
var pprice;
var pquantity;
function start(){
   inquirer
   .prompt([
       {
        type : "list",
        name: "manager",
        message :"Pickup an option",
        choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
        }
    ])
   .then(answers=>{
       switch (answers.manager) {
           case "View Products for Sale":
               ViewProducts();
                  break;
            case "View Low Inventory":
               ViewInventory();
                  break;
            case "Add to Inventory":
                AddInventory();
                break;
            case "Add New Product":
                AddProduct();
                break;
           
       }
   })

}
start();
function ViewProducts(){
    db.query("select product_id as ID, product_name as Product, price as Price ,stock_quantity as Quantity from products",(err,res)=>{
        
        if(err) throw err;
            if(res.length > 0){
                for (let i = 0; i < res.length; i++) {
                    console.log("ID: " + res[i].ID + " | Product: " + res[i].Product + " | Price: " + res[i].Price + "|  Quantity : "
                     + res[i].Quantity);                
                }
                start();

            }  else{
                console.log("Store is empty")
        }
        
    })
}
function ViewInventory(){
    db.query("select product_id as ID, product_name as Product, price as Price  from products where stock_quantity < 5",(err,res)=>{
        if(err) throw err;
            if(res.length > 0){
                for (var  i = 0; i < res.length; i++) {
                console.log("ID: " + res[i].ID + " | Product: " + res[i].Product + " | Price: " + res[i].Price );                
                }
                    start();

            }  else{
                
                console.log("Store is full")
                start();
                
        }
       
    })
   
}
function AddInventory(){
    
           
    inquirer
    .prompt([
        {
             type: "input",
             name : "id",
             message :"Enter Product ID"

        },
        {
            type: "input",
            name :"quantity",
            message :"Quantity to add : "
        }
    ])
    .then(answers=>{
        var id = answers.id;
        var qinput= parseInt(answers.quantity);
        db.query("Select stock_quantity as Quantity from products where product_id=?",[id],(err,res)=>{
            if(err) throw err;
            if(res.length > 0){
                var qstore= res[0].Quantity;
                var new_amount = qinput + qstore;
        db.query("UPDATE products SET stock_quantity = ? WHERE product_id  = ?",[new_amount,id],(err,res)=>{
            if(err) throw err;
            if(res.affectedRows > 0){
                console.log("The quantity of the products has been updated!");
           
            } 

        }) 

            }else {
                console.log("No product Found")}
           
        })
    })
                         
                        
}
function AddProduct() {
   inquirer
   .prompt([
       
       {
        type:"type",
        name:"product_name",
        message:"Enter Product Name :"

     },
     {
        type:"type",
        name:"price",
        message:"Enter Product Price :"

    },
    {
        type:"type",
        name:"quantity",
        message:"Enter Product Quantity :"

    }
    ])
    .then(answers=>{
        department=[];
        pdepartment=answers.department_name;
        pname =answers.product_name;
        pprice=answers.price,
                           
         pquantity=answers.quantity,
        db.query("SELECT  department_name FROM bamazon.departments;",(err,res)=>{
            if(err) throw err;

            for (var i =0; i < res.length; i++) {
                department.push(res[i].department_name);
                
            }
            inquirer
                .prompt([{
                    type: "list",
                    name:"select_dep",
                    message :"Select department",
                    choices : department
                }])
                .then(answers=>{
                  
                   department_name=answers.select_dep;
                    db.query("SELECT  department_id  FROM  departments  where  department_name = ?",
                    [department_name],(err,res)=>{
                        if(err) throw err;
                        if(res.length > 0)
                        {    if(pname == "" || pprice == " " || pquantity ==""){
                            console.log("Must enter Item Values")
                            start();

                        }else{
                            db.query("INSERT INTO products SET product_name= ?, price = ?, stock_quantity = ?, department_id = ?",
                            [pname,pprice,pquantity,res[0].department_id],(err,res)=>{
                                if(err) throw err;
                                if(res.affectedRows > 0){
                                    console.log("Product inserted successfully!");
                                    start();
                                }
                            })

                        }
                            

                        }else{
                            console.log("Must Enter a Department");
                        }
                    })
                })
            })
        })
    
    
}