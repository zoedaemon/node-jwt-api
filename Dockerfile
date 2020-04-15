# This stage installs our modules
FROM mhart/alpine-node:12
ADD src ./src
WORKDIR ./
COPY package.json package-lock.json ./

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

#must npm 12
RUN npm ci --prod 

# RUN npm install

#start with production
CMD [ "npm", "run", "start:prod" ]