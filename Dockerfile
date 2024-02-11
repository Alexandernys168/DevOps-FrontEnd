FROM node as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING=true

COPY ./package.json /app/
COPY ./package-lock.json /app/
COPY . /app
RUN npm ci --production --force
RUN npm install
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]