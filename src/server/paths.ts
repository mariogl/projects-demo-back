export const partialPaths = {
  users: {
    base: "/users",
    register: "/register",
  },
};

export const paths = {
  users: {
    register: `${partialPaths.users.base}${partialPaths.users.register}`,
  },
};

export const uploadsPath = "uploads";
