VERSION=`git describe --always`

echo $VERSION

docker build . -t orsondc/surf-battles-react
docker push orsondc/surf-battles-react
