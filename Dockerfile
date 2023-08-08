FROM node:alpine
RUN mkdir -p /home/node/app && chown -R node:node /home/node
WORKDIR /home/node/app
COPY package*.json ./
RUN npm install
USER node
COPY --chown=node:node . .
CMD [ "npm", "run start:dev" ]
#CMD ["node", "dist/server.js"]
EXPOSE 3000
# Install development packages if NODE_ENV is set to "development"
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN if [ "$NODE_ENV" == "development" ]; then npm install ; fi