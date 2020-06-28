FROM mongo

COPY users.json /users.json
CMD mongoimport --host product-mongo-db --db product --collection users --type json --file /users.json --jsonArray