FROM node:14.5.0-buster-slim

ENV PORT 5000
EXPOSE 5000

WORKDIR /usr/src/app

COPY . .

# for setting full module to develop
#RUN yarn install
#RUN yarn build

#for only setting dependency module
RUN yarn add express
RUN yarn add express-ws

CMD [ "node", "index.js" ]
#CMD ["/bin/bash"]
#CMD [ "DEBUG=express:*", "node", "index.js" ]