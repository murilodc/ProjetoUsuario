FROM node:20.19 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm list tailwindcss autoprefixer

RUN npx shadcn-ui@latest init -y --skip-git

RUN npx shadcn-ui@latest add button input card

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]