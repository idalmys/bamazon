# Bamazon
It is an app that display an existing product listing. The app will take in orders from customers and deplete stock from the store's inventory.The app request data to the database BAMAZON that include 2 tables (products and departments) with a relation betwen tables from one to many.That means department contains many products but the products belong to one department.The app Include 3 modules(Customer ,Manager, Supervisor):

# Customer
Can select the product you are buying, in case you enter an incorrect id the system shows you an error (Incorrect ID) and generate again the list of existing products. Once you select a product allows you to enter the amount to buy, if we have that amount an invoice is generated and the quantity for that product is updated (You order has been placed sucessfully). Otherwise, the system will show an error (Insuficients products).
# Manager
List a set of menu options:

View Products for Sale

View Low Inventory

Add to Inventory

Add New Product

If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.The app always update the inventory

If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.In case the mnager add more quantity to a product with low inventory the inventory will be updated

If a manager selects Add New Product, it should allow the manager to add a completely new product to a selected department to the store.



# Supervisor
List a set of menu options:
View Product Sales by Department

Create New Department
If a supervisor selects View Product Sales by Department the app display a summarized table
If a  selects Create new department , it should allow to the supervisor to add a complety department
# Tecnologies
node.js, package json, inquiere, mysql ,jquery ,  console.table to print summarized table
