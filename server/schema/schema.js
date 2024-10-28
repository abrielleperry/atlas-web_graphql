const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLScalarType
} = require('graphql');
const _ = require('lodash');

const tasks = [
  { id: '1', title: 'Create your first webpage', weight: 1, description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)', projectId: '1' },
  { id: '2', title: 'Structure your webpage', weight: 1, description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order', projectId: '1' }
];

const projects = [
  { id: '1', title: 'Advanced HTML', weight: 1, description: 'Welcome to the Web Stack specialization...' },
  { id: '2', title: 'Bootstrap', weight: 1, description: 'Bootstrap is a free and open-source CSS framework...' }
];

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      args: { projectId: { type: GraphQLID } },
      resolve(parent, args) {
        return _.filter(tasks, task => task.projectId === args.projectId);
      },
    }
  })
});

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(projects, { id: args.id })
      },
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return _.find(tasks, { id: args.id });
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(projects, { id: args.id });
      },
    },
    taskWithProject: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        const task = _.find(tasks, { id: args.id });
        if (!task) {
          throw new Error(`Task with ID ${args.id} not found`);
        }
        return task;
      },
    },
    projectWithTasks: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const project = _.find(project, { id: args.id })
        if (!project) {
          throw new Error(`Project with ID ${args.id} not found`)
        }
        return project;
      },
    },
  },
});


module.exports = new GraphQLSchema({
  query: RootQuery
});
