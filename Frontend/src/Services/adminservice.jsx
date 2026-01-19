const AdminService = {
  getAllUsers: async (axiosPrivate) => {
    const response = await axiosPrivate.get('management/users');
    return response.data;
  },

  updateUserRole: async (axiosPrivate, id, newRole) => {
    const response = await axiosPrivate.put(
      `management/update-role/${id}`,
      { newRole }
    );
    return response.data;
  },
};
export default AdminService;