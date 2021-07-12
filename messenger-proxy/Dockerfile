FROM nginx

EXPOSE 3003

RUN rm /usr/share/nginx/html/*

COPY configs/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"] 
