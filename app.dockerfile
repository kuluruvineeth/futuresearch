FROM node:buster-slim

ARG NEXT_PUBLIC_WS_URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /home/futuresearch

COPY ui /home/futuresearch/

RUN npm install
RUN npm run build

CMD ["npm","start"]