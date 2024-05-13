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
- Deploy Jenkins in Kubernetes:
```bash
kubectl create namespace devops-tools && \
kubectl apply -f jenkins/serviceAccount.yaml && \
kubectl create -f jenkins/volume.yaml && \
kubectl apply -f jenkins/deployment.yaml
```
> Official [documentation](https://www.jenkins.io/doc/book/installing/kubernetes/).
- Create Ingress object to route to Jenkins service:
```bash
kubectl apply -f ingress.yaml
```
- Configure your hostname to kubernetes cluster:
```bash
sudo echo "$(minikube ip)   testing.com" | sudo tee -a /etc/hosts
```
> That command will do the job but I recommend doing it manually.

## Jenkins
Jenkins will ask for the initial Admin password when you access the dashboard for the first time. The following command can help you to get the password:
```bash
kubectl exec -it $(kubectl get pods -n devops-tools | awk '/^jenkins/{print $1}') -n devops-tools -- cat /var/jenkins_home/secrets/initialAdminPassword
```

Once you enter the password, proceed to install the suggested plugin and create an admin user. All of these steps are self-explanatory from the Jenkins dashboard.

### Kubernetes plugin
Install Jenkins [plugin](https://plugins.jenkins.io/kubernetes/) to run dynamic agents in a Kubernetes cluster. The plugin creates a Kubernetes Pod for each agent started, and stops it after each build.


## Credits
I was stuck trying to access Jenkins through Ingress, but I found an [article](https://tech.aabouzaid.com/2022/08/2-ways-to-route-ingress-traffic-across-namespaces.html) that explains in detail how to fix it. Credit goes to [Ahmed AbouZaid](https://www.linkedin.com/in/aabouzaid/).