pipeline {
    agent { label 'agent' }

    environment {
        APP_DIR = "/home/ubuntu/app"
        DATA_DIR = "/home/ubuntu/data"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/harikamekala222/Contacts-app.git'
            }
        }

        stage('Install & Build') {
            steps {
                sh '''
                echo "Installing Backend..."
                cd backend
                npm install

                echo "Installing Frontend..."
                cd ../frontend
                npm install

                echo "Building Frontend..."
                npm run build
                '''
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                echo "Deploying Frontend..."
                sudo rm -rf /var/www/html/* || true
                sudo cp -r frontend/build/* /var/www/html/
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                echo "Creating directories..."
                mkdir -p $APP_DIR
                mkdir -p $DATA_DIR

                echo "Copying backend files..."
                cp -r backend/* $APP_DIR/

                echo "Copying database..."
                cp backend/db.js $DATA_DIR/

                ls -l $APP_DIR
                '''
            }
        }

        stage('Start Backend') {
            steps {
                sh '''
                cd $APP_DIR

                echo "Stopping old backend..."
                pm2 delete backend || true

                echo "Starting backend..."

                if [ -f index.js ]; then
                    pm2 start index.js --name backend
                elif [ -f server.js ]; then
                    pm2 start server.js --name backend
                else
                    echo "No entry file found"
                    exit 1
                fi

                pm2 save
                '''
            }
        }
    }
}
