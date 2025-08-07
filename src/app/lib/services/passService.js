import Password from "../database/models/Password";

export const addPassword = async (url, username, password, gmail) => {
  try {

    const passwordData = new Password({ url, username, password, gmail });
    await passwordData.save();

    return "Successfully Added";
  } catch (e) {
    throw new Error("Error occurred while saving password: " + e.message);
  }
};
