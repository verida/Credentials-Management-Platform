export const schemas = {
  "https://schemas.verida.io/health/pathology/tests/covid19-pcr/schema.json": {
    view: ["fullName", "healthNumber", "testType", "testResult"],
    create: ["fullName", "healthNumber", "dateOfBirth", "testType", "testResult"]
  }
};
