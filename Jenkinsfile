pipeline {

    agent any

    environment {
        COMPOSE_PROJECT_NAME = "contacts-app"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "Cloning GitHub Repository..."
                checkout scm
            }
        }


        stage('Build Docker Images') {
            steps {
                echo "Building Docker Images..."
                sh 'docker compose build'
            }
        }


        stage('Stop Old Containers') {
            steps {
                echo "Stopping Existing Containers..."
                sh 'docker compose down || true'
            }
        }


        stage('Deploy Application') {
            steps {
                echo "Starting Containers..."
                sh 'docker compose up -d'
            }
        }


        stage('Health Check') {
            steps {
                echo "Checking Application Health..."

                sh '''
                sleep 10

                docker compose ps

                curl -f http://localhost:5000 || exit 1
                '''
            }
        }

    }


    post {

        success {
            echo 'Deployment Successful.'
        }

        failure {
            echo 'Deployment Failed.'
        }

        always {
            echo 'Pipeline Finished.'
        }

    }

}
