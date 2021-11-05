export const schemas = {
  "https://schemas.verida.io/health/pathology/tests/cholesterol/total/schema.json": {
    view: ["testType", "testResult"],
    create: [
      "fullName",
      "dateOfBirth",
      "patientId",
      "testTimestamp",
      "result",
      "acceptable",
    ],
  },
  // "https://27tqk.csb.app/schemas/health-prescription.json": {
  //   view: ["name", "medication", "issueDate"],
  //   create: ["name", "notes", "medication", "dateOfBirth", "purpose"],
  // },
  "https://27tqk.csb.app/schemas/health-prescription.json": {
    view: ["name", "medication", "issueDate"],
    create: ["name", "notes", "medication", "dateOfBirth", "purpose"],
  },
  "https://schemas.verida.io/health/pathology/tests/covid19/pcr/schema.json": {
    view: ["testType", "testResult"],
    create: ["fullName", "dateOfBirth", "patientId", "testTimestamp", "result"],
  },
  "https://schemas.verida.io/health/pathology/tests/glucose/fasting/schema.json": {
    view: ["testType", "testResult"],
    create: [
      "fullName",
      "dateOfBirth",
      "patientId",
      "testTimestamp",
      "result",
      "acceptable",
    ],
  },
  "https://schemas.verida.io/health/pathology/tests/haemoglobin/schema.json": {
    view: ["testType", "testResult"],
    create: [
      "fullName",
      "dateOfBirth",
      "patientId",
      "testTimestamp",
      "result",
      "acceptable",
    ],
  },
  "https://schemas.verida.io/health/pathology/tests/syphilis/ab/schema.json": {
    view: ["testType", "testResult"],
    create: ["fullName", "dateOfBirth", "patientId", "testTimestamp", "result"],
  },
};
