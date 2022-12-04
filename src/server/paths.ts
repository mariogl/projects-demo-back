export const partialPaths = {
  users: {
    base: "/users",
    register: "/register",
    login: "/login",
    students: "/students",
  },
  projects: {
    base: "/projects",
    create: "/create",
  },
};

export const paths = {
  users: {
    register: `${partialPaths.users.base}${partialPaths.users.register}`,
    login: `${partialPaths.users.base}${partialPaths.users.login}`,
  },
  projects: {
    create: `${partialPaths.projects.base}${partialPaths.projects.create}`,
  },
};

export const uploadsPath = "uploads";
