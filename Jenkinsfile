pipeline {
  agent {
    kubernetes {
      yamlFile 'deployments/k8s/jenkins/inbound-pod.yaml'
      retries 2
    }
  }
  stages {
    stage('Setup') {
      steps {
        sh 'Hello World!'
      }
    }
  }
}