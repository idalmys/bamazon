DROP DATABASE IF EXISTS bamazon;
Create Database bamazon;
Use bamazon;

Create table departments(
department_id INT NOT NUll ,
department_name VARCHAR(45) NOT NULL,
over_head_cost INT NOT NULL,
PRIMARY KEY (department_id)
);

Create table products(
product_id INT NOT NULL,
product_name VARCHAR(60) NOT NULL,
price INT NOT NULL,
stock_quantity INT NOT NULL,
product_sale INT,
PRIMARY KEY (product_id),
department_id INT NOT NULL,
CONSTRAINT department_id FOREIGN KEY (department_id) REFERENCES departments(department_id)
);