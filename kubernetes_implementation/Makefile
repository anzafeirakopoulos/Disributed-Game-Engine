make: Distri_secret.yaml env-configmap.yaml user-interface-kuber.yaml mysqldb-kuber.yaml authentication-kuber.yaml postgresdb-kuber.yaml game-master-kuber.yaml mongodb-kuber.yaml play-master-kuber.yaml
	kubectl apply -f Distri_secret.yaml
	kubectl apply -f env-configmap.yaml
	kubectl apply -f user-interface-kuber.yaml
	kubectl apply -f mysqldb-kuber.yaml
	kubectl apply -f authentication-kuber.yaml
	kubectl apply -f postgresdb-kuber.yaml
	kubectl apply -f game-master-kuber.yaml
	kubectl apply -f mongodb-kuber.yaml
	kubectl apply -f play-master-kuber.yaml

clean:
	kubectl delete deployment user-interface
	kubectl delete deployment authentication
	kubectl delete deployment mysql
	kubectl delete deployment game-master
	kubectl delete deployment postgres
	kubectl delete deployment mongo
	kubectl delete deployment play-master
	kubectl delete service user-interface-service
	kubectl delete service authentication-service
	kubectl delete service mysql-service
	kubectl delete service game-master-service
	kubectl delete service postgres-service
	kubectl delete service mongo-service
	kubectl delete service play-master-service
	kubectl delete -f env-configmap.yaml -n default
	kubectl delete -f Distri_secret.yaml -n default