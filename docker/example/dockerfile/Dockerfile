FROM nginx:1.23.1
RUN apt-get update
RUN apt-get install -y vim
COPY ./dist  /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/nginx.conf
