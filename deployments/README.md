<div align="center">
    <h1 align="center">Kubernetes</h1>
</div>
<hr>

## Getting Started
- Install [minikube](https://minikube.sigs.k8s.io/docs/start/#take-the-next-step):
```bash
minikube start --memory 10240 --cpus 12
```
> I have `kubectl` installed on my local machine, so I can avoid using `minikube kubectl --`. [Here](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/) is the official documentation.

- Enable ingress addon:
```bash
minikube addons enable ingress
```

- Install [helm](https://helm.sh/docs/intro/install/).

## Jenkins
- Deploy Jenkins in Kubernetes:
```bash
kubectl create namespace devops-tools && \
helm repo add jenkins https://charts.jenkins.io && \
helm repo update && \
helm install jenkins jenkins/jenkins -n devops-tools
```
> Official [documentation](https://github.com/jenkinsci/helm-charts/tree/main/charts/jenkins).

- Create Ingress object to route to Jenkins service:
```bash
kubectl apply -f ingress.yaml
```

- Configure your hostname to kubernetes cluster:
```bash
sudo echo "$(minikube ip)   testing.com" | sudo tee -a /etc/hosts
```
> That command will do the job but I recommend doing it manually.

- Wait a few minutes for the necessary resources to be created within Kubernetes, then proceed to get your `admin` user password by running:
```bash
kubectl exec -n devops-tools -it svc/jenkins -c jenkins -- cat /run/secrets/additional/chart-admin-password && echo
```

- Login with the password from above step and the username `admin`.