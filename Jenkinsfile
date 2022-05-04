pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                bash sh 'npm install'
            }
        }
        stage('test') {
            steps{
                nodejs(nodeJSInstallaionName:'nodejs'){
                   bash sh 'npm install --only=dev'
                   bash sh 'npm test'
                }
            }
        }
        stage('Deliver') {
            steps {
                bash sh './jenkins/scripts/deliver.sh'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
                bash sh './jenkins/scripts/kill.sh'
            }
        }
    }
}

