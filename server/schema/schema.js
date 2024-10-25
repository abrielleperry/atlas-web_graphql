const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      resolve(parent, args) {
        return {
          id: '1',
          title: 'Sample Task',
          weight: 10,
          description: 'A sample task description'
        };
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
