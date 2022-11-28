import { Factory } from "fishery";
import { faker } from "@faker-js/faker";
import type { ProjectData } from "../server/types/types";

const projectsFactory = Factory.define<ProjectData>(() => ({
  name: `${faker.word.adjective()} ${faker.word.noun()}`,
  date: faker.date.past(),
  student: faker.database.mongodbObjectId(),
  technologies: ["", ""].map(() => faker.hacker.noun()),
}));

export const getMockProject = (data?: Partial<ProjectData>) =>
  projectsFactory.build(data);
