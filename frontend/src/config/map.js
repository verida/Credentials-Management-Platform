export const schemas = {
	"https://common.schemas.verida.io/health/pathology/tests/cholesterol/total/v0.1.0/schema.json": {
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
	"https://common.schemas.verida.io/health/pathology/tests/covid19/pcr/v0.1.0/schema.json": {
		view: ["testType", "testResult"],
		create: ["fullName", "dateOfBirth", "patientId", "testTimestamp", "result"],
	},
	"https://common.schemas.verida.io/health/pathology/tests/glucose/fasting/v0.1.0/schema.json": {
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
	"https://common.schemas.verida.io/health/pathology/tests/haemoglobin/v0.1.0/schema.json": {
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
	"https://common.schemas.verida.io/health/pathology/tests/syphilis/ab/v0.1.0/schema.json": {
		view: ["testType", "testResult"],
		create: ["fullName", "dateOfBirth", "patientId", "testTimestamp", "result"],
	},
};
