create extension if not exists "uuid-ossp";

create table products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
    description text,
    price integer
);

create table store (
	product_id uuid REFERENCES products(id),
    count integer
);

insert into products (title, description, price) VALUES('The 6:20 Man','When his ex-girlfriend turns up dead in his office building, an entry-level investment analyst delves into the halls of economic power.', 99);
insert into products (title, description, price) VALUES('The It Girl','A decade after her first year at Oxford, an expectant mother looks into the mystery of her former best friend’s death.', 110);
insert into products (title, description, price) VALUES('The Hotel Nantucket','The new general manager of a hotel far from its Gilded Age heyday deals with the complicated pasts of her guests and staff.', 150);
insert into products (title, description, price) VALUES('Sparring Partners','Three novellas: “Homecoming,” “Strawberry Moon” and “Sparring Partners.”', 90);

insert into store (product_id, count) values((select id from products where title = 'The 6:20 Man'), 5);
insert into store (product_id, count) values((select id from products where title = 'The It Girl'), 2);
insert into store (product_id, count) values((select id from products where title = 'The Hotel Nantucket'), 3);
insert into store (product_id, count) values((select id from products where title = 'Sparring Partners'), 9);