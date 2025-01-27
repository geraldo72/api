# ---- Base Node ----
FROM alpine AS base
# install node
RUN apk add --no-cache nodejs npm tini
# set working directory
WORKDIR /root/chat
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]
# copy project file
COPY package.json .
#
# ---- Dependencies ----
FROM node:10.15.2-alpine AS dependencies
WORKDIR /root/chat
COPY package.json .
# install node packages
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production 
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install

#
# ---- Test ----
# run linters, setup and tests
FROM node:10.15.2-alpine AS test
COPY --from=dependencies /root/chat/node_modules ./node_modules
COPY package.json .
COPY ./src ./src
COPY tsconfig*.json ./
RUN  npm run build
#
# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /root/chat/prod_node_modules ./node_modules
# copy app sources
COPY --from=test ./dist ./dist
# expose port and define CMD
ENV PORT=5000
EXPOSE 5000
RUN node --version
CMD npm run start:prod
