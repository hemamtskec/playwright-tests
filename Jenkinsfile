pipeline {
    agent any

    tools {
        allure 'allure'   //this links Jenkins tool
    }
    
    stages {

        stage('Checkout') {
            steps {
                // SCM already checks out code, but this ensures credentials usage
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                withCredentials([
                    string(credentialsId: 'base-url', variable: 'BASE_URL'),
                    string(credentialsId: 'PIPE_CRM_USERNAME', variable: 'CRM_USERNAME'),
                    string(credentialsId: 'PIPE_CRM_PASS', variable: 'CRM_PASSWORD')
                ]) {

                    bat """
                    echo BASE_URL=%BASE_URL%
                    echo USERNAME=%CRM_USERNAME%

                    npx playwright test
                    """
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                //bat "allure generate allure-results --clean -o allure-report"
                   allure([
            includeProperties: false,
            jdk: '',
            results: [[path: 'allure-results']]
        ])
            }
        }


    }

    post {
        always {

            // ✅ Playwright HTML Report
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
            ])

            // ✅ Publish Allure HTML report
            publishHTML([
                reportDir: 'allure-report',
                reportFiles: 'index.html',
                reportName: 'Allure Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])

            // ✅ Archive report files
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
        }
    }
}
