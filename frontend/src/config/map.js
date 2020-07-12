export const schemas = {
  "https://schemas.verida.io/health/pathology/tests/covid19-pcr/schema.json": {
    view: ["testType", "testResult"],
    create: [
      "fullName",
      "dateOfBirth",
      "testType",
      "testResult",
      "testTimestamp"
    ]
  }
};