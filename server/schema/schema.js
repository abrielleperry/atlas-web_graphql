const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const Project = require('../models/project');
const Task = require('../models/task');


const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      async resolve(parent, args) {
        return await Task.find({ projectId: parent.id });
      }
    }
  })
});

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      async resolve(parent, args) {
        return await Project.findOne({ id: parent.projectId });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Task.findOne({ id: args.id });
      }
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Project.findOne({ id: args.id });
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await Task.find({});
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Project.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt)},
        description: { type: new GraphQLNonNull(GraphQLString)}
      },
      async resolve(parent, args) {
        const { id, title, weight, description } = args;
        const project = new Project({
          id,
          title,
          weight,
          description
        });
        return await project.save();
      }
    },
    addTask: {
      type: TaskType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt)},
        description: { type: new GraphQLNonNull(GraphQLString)},
        project: { type: new GraphQLNonNull(GraphQLID) }
      },
      async resolve(parent, args) {
        const { id, title, weight, description, projectId } = args;
        const task = new Task({
          id,
          title,
          weight,
          description,
          projectId
        });
        return await task.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
