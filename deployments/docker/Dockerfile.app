FROM alpine:latest

# Install python
ENV PYTHONUNBUFFERED=1
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN apk add --no-cache py3-pip

# Install k6 grafana
ARG K6_VERSION=0.51.0

RUN wget https://github.com/grafana/k6/releases/download/v${K6_VERSION}/k6-v${K6_VERSION}-linux-amd64.tar.gz 
RUN tar -xzf k6-v${K6_VERSION}-linux-amd64.tar.gz -C /usr/bin
ENV PATH="${PATH}:/usr/bin/k6-v${K6_VERSION}-linux-amd64"

# Install nodejs and npm
RUN apk add nodejs npm