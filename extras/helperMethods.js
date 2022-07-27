const axios = require("axios").default;

const sendNotfications = async (emails, message) => {
    try {
        const data = { emails, message };
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await axios.post(
            "https://prod-19.southeastasia.logic.azure.com:443/workflows/803a09579ae4443795c06aee661a367f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CZ_Ph_BVKaL-HxGuw82aY5toOeTF3WGveBu4LBlCbsU",
            data,
            config
        );

        return response.data;
    } catch (e) {
        console.error(e);
        return e;
    }
};

/* helper methods */
const getAllStudents = async () => {
    const students = [
        "2018e022@eng.jfn.ac.lk",
        "2018e031@eng.jfn.ac.lk",
        "2018e091@eng.jfn.ac.lk",
        "2018e104@eng.jfn.ac.lk",
        "2018e108@eng.jfn.ac.lk",
    ];

    return new Promise((resolve, reject) => {
        resolve(students);
    });
};

module.exports = {
    sendNotfications,
    getAllStudents,
};
