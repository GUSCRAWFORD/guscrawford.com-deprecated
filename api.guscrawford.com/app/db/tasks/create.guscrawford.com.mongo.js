db = db.getSiblingDB('GusCrawfordDotCom');
print('Creating GusCrawfordDotCom...');
db.getCollection("Events").insertOne({ts:new Date().valueOf(),event:'Create'});
print('Done');