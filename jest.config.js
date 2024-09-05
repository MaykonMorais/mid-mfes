const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  modulePathIgnorePatterns: ['<rootDir>/.next'],
  testPathIgnorePatterns: ['/node_modules/', './next/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageDirectory: 'reports',
  coverageReporters: ['coverage'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coveragePathIgnorePatterns: ['next.config.js', 'types', 'constants'],
  coverageThreshold: {
    global: {
      statements: 90,
    },
  },
  reporters: [
    'default',
    [
      'jest-sonar',
      { outputDirectory: 'reports', outputName: 'test-report.xml' },
      'text',
      'html',
    ],
  ],
};
module.exports = createJestConfig(customJestConfig);
