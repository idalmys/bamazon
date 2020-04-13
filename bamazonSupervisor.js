const db =require("./database");
const inquirer=require("inquirer");
const cTable = require("console.table");

function start(){

    inquirer
    .prompt([
        {  
            type:"list",
            name:"select_option",
            message : "Pickup an option",
            choices: ["View Product Sales by Department","Create new department"]

        }        
    ])
    .then(answers=>{
        data_table=[];
        if(answers.select_option == "View Product Sales by Department"){
            db.query("select  department_id, department_name, over_head_cost ,Sum(product_sale) as product_sale from departments inner join products using (department_id ) group by department_name",
            (err,res)=>{
                if(err) throw err;
                if(res.length > 0){
                    for(var i =0; i<res.length; i++){
                        var total_profit= res[i].product_sale - res[i].over_head_cost;
                       
                       data_table.push( [res[i].department_id,res[i].department_name,res[i].over_head_cost,res[i].product_sale,total_profit]);
                       
                        
                    }
                    
                    console.table( ["department_id","department_name","over_head_cost","product_sale","total_profit"],data_table);
                    start();

                }else{
                    console.log("No data found")
                    start();
                }

            })
          
            

        }
        if(answers.select_option =="Create new department"){
            inquirer
            .prompt([ 
                {
                    type:"input",
                    name: "depart_name",
                    message:"Enter Department name"

                },
                {
                    type:"input",
                    name: "over_head",
                    message:"Enter Over Head Cost"

                }

            ])
            .then(answers=>{

                var dname= answers.depart_name;
                var dcost =answers.over_head;
                db.query("Insert into departments SET department_name =?, over_head_cost=?",[dname,dcost],(err,res)=>{
                    if(err) throw err;
                    if(res.affectedRows > 0){
    
                        console.log("Department inserted successfully!");
                        
                    } 
                    start();
    
                })

            })
            

        }
    })
}
start();