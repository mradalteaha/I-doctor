pipeline {
    agent {
        docker {
            image 'node:lts-buster-slim'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Code Coverage'){
            steps{
                sh 'npm t -- --coverage'
            }
        }
        stage('Deliver') {
            steps {
            sh 'npm run test'
            }
        }
    }
}
