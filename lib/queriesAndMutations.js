import gql from 'graphql-tag';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(name: $name, email: $email, password: $password) {
      id
    }
  }
`;

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      participatingBrewingProcesses {
        id
        name
        start
        end
        description
        bottlesAvailable
        brewingSteps(active: true) {
          id
          name
          start
          end
        }
      }
    }
  }
`;

const ALL_BREWING_PROCESSES_QUERY = gql`
  query BREWING_PROCESSES_QUERY {
    brewingProcesses {
      id
      name
      description
      start
      end
      brewingSteps(active: true) {
        id
        name
        start
        end
      }
      participatingUsers {
        id
      }
      bottlesAvailable
    }
  }
`;

const FINISHED_BREWING_PROCESSES_QUERY = gql`
  query BREWING_PROCESSES_QUERY {
    brewingProcesses(ended: true) {
      id
      name
      description
      start
      end
      bottlesAvailable
    }
  }
`;

const BREWING_PROCESS_QUERY = gql`
  query BREWING_PROCESS_QUERY($id: ID!) {
    brewingProcess(id: $id) {
      id
      name
      start
      description
      end
      brewingSteps(active: true) {
        id
        name
        start
        end
        graphs {
          id
          sensor {
            topic
            name
            binary
          }
          graphData(dataPoints: 100) {
            id
            time
            value
          }
        }
        mediaStreams {
          id
          updateFrequency
        }
      }
    }
  }
`;

const ACTIVE_GRAPHS_QUERY = gql`
  query ACTIVE_GRAPHS_QUERY($dataPoints: Int = 100) {
    graphs(active: true) {
      id
      sensor {
        topic
        name
        binary
      }
      graphData(dataPoints: $dataPoints) {
        id
        time
        value
      }
    }
  }
`;

const ALL_GRAPHS_QUERY = gql`
  query ALL_GRAPHS_QUERY {
    graphs {
      id
      sensor {
        topic
        name
        binary
      }
      updateFrequency
      brewingStep {
        id
        name
        brewingProcess {
          id
        }
      }
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
    }
  }
`;

const CREATE_BREWING_PROCESS_MUTATION = gql`
  mutation CREATE_BREWING_PROCESS_MUTATION(
    $name: String!
    $startNow: Boolean
    $description: String!
  ) {
    createBrewingProcess(
      name: $name
      startNow: $startNow
      description: $description
    ) {
      id
    }
  }
`;

const DELETE_BREWING_PROCESS_MUTATION = gql`
  mutation DELETE_BREWING_PROCESS($id: ID!) {
    deleteBrewingProcess(id: $id) {
      message
    }
  }
`;

const CHANGE_BOTTLES_AVAILABLE_MUTATION = gql`
  mutation CHANGE_BOTTLES_AVAILABLE_MUTATION(
    $brewingProcessId: ID!
    $bottlesAvailable: Int!
  ) {
    changeBottlesAvailable(
      brewingProcessId: $brewingProcessId
      bottlesAvailable: $bottlesAvailable
    ) {
      id
    }
  }
`;

const DELETE_GRAPH_MUTATION = gql`
  mutation DELETE_GRAPH_MUTATION($id: ID!) {
    deleteGraph(id: $id) {
      message
    }
  }
`;

const DELETE_MEDIA_STREAM_MUTATION = gql`
  mutation DELETE_MEDIA_STREAM_MUTATION($id: ID!) {
    deleteMediaStream(id: $id) {
      message
    }
  }
`;

const ADVANCE_BREWING_PROCESS_MUTATION = gql`
  mutation ADVANCE_BREWING_PROCESS_MUTATION($brewingProcessId: ID!) {
    advanceBrewingProcess(brewingProcessId: $brewingProcessId) {
      brewingSteps {
        id
      }
    }
  }
`;

const ADD_USERS_TO_BREWING_PROCESS_MUTATION = gql`
  mutation ADD_USERS_TO_BREWING_PROCESS_MUTATION(
    $brewingProcessId: ID!
    $userIds: [ID!]!
  ) {
    addUsersToBrewingProcess(
      brewingProcessId: $brewingProcessId
      userIds: $userIds
    ) {
      id
    }
  }
`;

const CREATE_GRAPH_MUTATION = gql`
  mutation CREATE_GRAPH_MUTATION(
    $sensorTopic: String!
    $updateFrequency: Int!
    $brewingProcessId: ID!
    $brewingStepName: StepName!
  ) {
    createGraph(
      sensorTopic: $sensorTopic
      updateFrequency: $updateFrequency
      brewingProcessId: $brewingProcessId
      brewingStepName: $brewingStepName
    ) {
      id
    }
  }
`;

const CREATE_SENSOR_MUTATION = gql`
  mutation CREATE_SENSOR_MUTATION(
    $topic: String!
    $name: String!
    $binary: Boolean!
  ) {
    createSensor(topic: $topic, name: $name, binary: $binary) {
      message
    }
  }
`;

const CREATE_MEDIA_STREAM_MUTATION = gql`
  mutation CREATE_MEDIA_STREAM_MUTATION(
    $mediaFilesName: String!
    $overwrite: Boolean!
    $updateFrequency: Int!
    $brewingProcessId: ID!
    $brewingStepName: StepName!
  ) {
    createMediaStream(
      mediaFilesName: $mediaFilesName
      overwrite: $overwrite
      updateFrequency: $updateFrequency
      brewingProcessId: $brewingProcessId
      brewingStepName: $brewingStepName
    ) {
      id
    }
  }
`;

const ALL_MEDIA_STREAMS_QUERY = gql`
  query ALL_MEDIA_STREAMS_QUERY {
    mediaStreams {
      id
      mediaFilesName
      updateFrequency
      brewingStep {
        id
        name
        brewingProcess {
          id
        }
      }
    }
  }
`;

const ACTIVE_MEDIA_STREAMS_QUERY = gql`
  query ACTIVE_MEDIA_STREAMS_QUERY {
    mediaStreams(active: true) {
      id
      updateFrequency
      brewingStep {
        id
      }
    }
  }
`;

const LATEST_MEDIA_STREAM_FILE_QUERY = gql`
  query LATEST_MEDIA_STREAM_FILE_QUERY($id: ID!) {
    mediaStream(id: $id) {
      id
      mediaFilesName
      mediaFiles(dataPoints: 1) {
        time
        publicIdentifier
      }
    }
  }
`;

const SENSOR_QUERY = gql`
  query SENSOR_QUERY {
    sensors {
      name
      topic
      binary
      latestTimeStamp
      latestValue
    }
  }
`;

export {
  ALL_BREWING_PROCESSES_QUERY,
  FINISHED_BREWING_PROCESSES_QUERY,
  BREWING_PROCESS_QUERY,
  CREATE_BREWING_PROCESS_MUTATION,
  ADVANCE_BREWING_PROCESS_MUTATION,
  ADD_USERS_TO_BREWING_PROCESS_MUTATION,
  DELETE_BREWING_PROCESS_MUTATION,
  ACTIVE_GRAPHS_QUERY,
  ALL_GRAPHS_QUERY,
  ALL_USERS_QUERY,
  CREATE_GRAPH_MUTATION,
  CREATE_SENSOR_MUTATION,
  CREATE_MEDIA_STREAM_MUTATION,
  DELETE_GRAPH_MUTATION,
  CURRENT_USER_QUERY,
  SIGNIN_MUTATION,
  SIGN_OUT_MUTATION,
  SIGN_UP_MUTATION,
  ALL_MEDIA_STREAMS_QUERY,
  ACTIVE_MEDIA_STREAMS_QUERY,
  LATEST_MEDIA_STREAM_FILE_QUERY,
  DELETE_MEDIA_STREAM_MUTATION,
  SENSOR_QUERY,
  CHANGE_BOTTLES_AVAILABLE_MUTATION,
};
