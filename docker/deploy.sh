RELEASE_TAG=latest
docker build -t localhost:5000/docker_api:$RELEASE_TAG ../api &&
docker push localhost:5000/docker_api:$RELEASE_TAG && 
docker build -t localhost:5000/docker_app:$RELEASE_TAG ../app &&
docker push localhost:5000/docker_app:$RELEASE_TAG &&
sh stack_prod_start.sh

