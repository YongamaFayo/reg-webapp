create table towns(
    id serial not null primary key,
    registration text not null,
    name_of_town text not null 
);

create table regNumber(
    id serial not null primary key,
    reg text not null,
    startsWith int not null,
    foreign key (name_of_registration) references towns(id)
);

INSERT INTO towns (registration, name_of_town) VALUES ('CJ', 'Paarl');
INSERT INTO towns (registration, name_of_town) VALUES ('CK', 'Malmesbury');
INSERT INTO towns (registration, name_of_town) VALUES ('CA', 'Cape Town');


