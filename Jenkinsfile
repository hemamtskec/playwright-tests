pipeline {
    agent any

    environment {
        ALLURE_RESULTS = 'allure-results'
        ALLURE_REPORT = 'allure-report'
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
                bat 'npx playwright test'
            }
        }

        stage('Generate Allure Report') {
            steps {
                bat "allure generate %ALLURE_RESULTS% --clean -o %ALLURE_REPORT%"
            }
        }

        stage('Verify Report') {
            steps {
                bat "dir %ALLURE_REPORT%"
            }
        }
    }

    post {
        always {

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
