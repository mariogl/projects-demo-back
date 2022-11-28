export const partialPaths = {
  users: {
    base: "/users",
    register: "/register",
    login: "/login",
  },
};

export const paths = {
  users: {
    register: `${partialPaths.users.base}${partialPaths.users.register}`,
    login: `${partialPaths.users.base}${partialPaths.users.login}`,
  },
};

export const uploadsPath = "uploads";
