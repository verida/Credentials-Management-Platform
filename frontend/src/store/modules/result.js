const state = {
  list: [
    {
      id: 1,
      fullName: "John Smith",
      dateOfBirth: "22 November 1976",
      healthNumber: "189-679-112 3",
      did: "did:ethr:0x33b92b41b775Ce6ebc0C8bcBdEf19B1e1d8bFd82",
      mobileNumber: "+361258825528"
    },
    {
      id: 2,
      fullName: "Jane Doe",
      dateOfBirth: "22 November 1976",
      healthNumber: "189-679-112 3",
      mobileNumber: "+361258825528",
      did: "did:ethr:0x33b92b41b775Ce6ebc0C8bcBdEf19B1e1d8bFd82"
    }
  ]
};

const getters = {
  cards: state =>
    state.list.map(({ id, fullName, dateOfBirth, healthNumber, did }) => ({
      id,
      patient: fullName,
      info: {
        DOB: dateOfBirth,
        "Health Number": healthNumber,
        DID: did
      }
    })),
  find: state => id => state.list.find(result => result.id === id)
};

const mutations = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
