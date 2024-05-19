pipeline {
  agent {
    kubernetes {
      yamlFile "./deployments/k8s/app.yaml"
    }
  }
   
  parameters {
    booleanParam(
      name: 'RUN_FUZZY_API_TEST',
      defaultValue: false, 
      description: "Do you want to run fuzzy API tests?"
    )
    booleanParam(
      name: 'RUN_PERFORMANCE_TEST',
      defaultValue: false, 
      description: "Do you want to run performance tests?"
    )
  }

  stages {
    /* stage('Setup') {
      steps {
        container('app') {
          sh '''
            pip install -q schemathesis --break-system-packages
          '''
        }
        container('golang') {
          sh 'go version'
        }
      }
    } */
    
    stage('Fuzzy-API-Test') {
      when {
        expression { params.RUN_FUZZY_API_TEST } 
      }
      steps {
        container('app') {
          sh '''
            pip install -q schemathesis --break-system-packages
            st run --checks all https://example.schemathesis.io/openapi.json
          '''
        }
      }
    }
    
    stage('Performance-Test') {
      when {
        expression { params.RUN_PERFORMANCE_TEST } 
      }
      steps {
        container('app') {
          sh 'k6 run tests/non-functional/performance/crocodiles-test.perf.js'
        }
      }
    }
  }
}