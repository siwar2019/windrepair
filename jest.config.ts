import type { Config } from 'jest'
const config: Config = {
    preset: 'ts-jest',
    transform: { '^.+\\.ts?$': 'ts-jest', '^.+\\.tsx$': 'ts-jest' },
    moduleNameMapper: {
        '.+\\.(css|png|jpg)$': 'identity-obj-proxy'
    },

    testEnvironment: 'jsdom',
    testEnvironmentOptions: {
        features: {
            webgl: true
        }
    },
    setupFiles: ['<rootDir>/src/tests/unit tests/jest.stub.js']
}

export default config
