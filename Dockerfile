FROM node:18

WORKDIR /app

COPY . .

EXPOSE 8000

CMD [ "tail","-F","README.md" ]