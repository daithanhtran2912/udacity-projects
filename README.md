## Project Overview
### Udacity Cloud DevOps Engineer Capstone Project
A simple Python `Hello World` project using [Flask](https://flask.palletsprojects.com/en/2.3.x/).

In this project you will apply the skills and knowledge which were developed throughout the Cloud DevOps Nanodegree program. These include:
* Working in AWS
* Using Circle CI to implement Continuous Integration and Continuous Deployment
* Building pipelines
* Working with CloudFormation to deploy clusters
* Building Kubernetes clusters
* Building Docker containers in pipelines

---

## Setup the Environment

* Install [Python](https://www.python.org/downloads/release/python-379/).

* Install [Docker](https://docs.docker.com/engine/install/).

* Create a virtualenv with Python 3.7 and activate it. Refer to this link for help on specifying the Python version in the virtualenv. 
```bash
python3 -m pip install --user virtualenv
# You should have Python 3.7 available in your host. 
# Check the Python path using `which python3`
# Use a command similar to this one:
python3 -m virtualenv --python=<path-to-Python3.7> .devops
source .devops/bin/activate
```

* Run `make install` to install the necessary dependencies

* Install [hadolint](https://github.com/hadolint/hadolint):
```bash
wget -O /bin/hadolint https://github.com/hadolint/hadolint/releases/download/v1.16.3/hadolint-Linux-x86_64 &&\
chmod +x /bin/hadolint
```

* Install [kubectl](https://kubernetes.io/docs/tasks/tools/#kubectl):
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client
or
kubectl version --client --output=yaml
```

* Install [minikube](https://kubernetes.io/docs/tasks/tools/#minikube):
```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube
minikube version
```
---

## Running `app.py`

1. Standalone:  `python app.py`
2. Run in Docker:  `./run_docker.sh`
3. Run in Kubernetes:  `./run_kubernetes.sh`

---

`Source code for html/css files: https://codepen.io/pokecoder/pen/gOXrxVY`