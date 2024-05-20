.PHONY: docker-push
docker-push:
	docker build --no-cache -t automation:latest -f deployments/docker/Dockerfile.app . && \
	docker tag automation:latest ivanandraschko/automation:latest && \
	docker push ivanandraschko/automation:latest