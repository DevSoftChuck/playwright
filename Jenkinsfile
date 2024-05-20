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
    booleanParam(
      name: 'RUN_PLAYWRIGHT_TEST',
      defaultValue: false, 
      description: "Do you want to run playwright tests?"
    )
    choice(
      name: 'TAG', 
      choices: ['regression', 'smoke', 'sanity', 'ui', 'api', 'axe'], 
      description: 'run tests that have a particular tag.'
    )
  }

  stages {
    /* stage('Setup') {
      steps {
        container('app') {
          sh '''
            pip install -q schemathesis --break-system-packages
            npm install --silent > '/dev/null' 2>&1
          '''
        }
        container('golang') {
          sh 'go version'
        }
      }
    } */

    stage('Playwright-Test') {
      when {
        expression { params.RUN_PLAYWRIGHT_TEST } 
      }
      steps {
        container('app'){
          sh """
            npm install --silent > '/dev/null' 2>&1
            npx playwright test --grep @${params.TAG}
          """
        }
      }
    }

    stage('Fuzzy-Api-Test') {
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