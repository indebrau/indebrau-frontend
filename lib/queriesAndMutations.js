import gql from 'graphql-tag';

const SIGNIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
    }
  }
`;

const SIGN_OUT_MUTATION = gql`
  mutation {
    signout {
      message
    }
  }
`;

const SIGN_UP_MUTATION = gql`
  mutation (
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
  query {
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
  query {
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
  query ($id: ID!) {
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
  query ($dataPoints: Int = 100) {
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
  query {
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
  query {
    users {
      id
      name
      email
    }
  }
`;

const CREATE_BREWING_PROCESS_MUTATION = gql`
  mutation (
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
  mutation ($id: ID!) {
    deleteBrewingProcess(id: $id) {
      message
    }
  }
`;

const CHANGE_BOTTLES_AVAILABLE_MUTATION = gql`
  mutation (
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
  mutation ($id: ID!) {
    deleteGraph(id: $id) {
      message
    }
  }
`;

const DELETE_MEDIA_STREAM_MUTATION = gql`
  mutation ($id: ID!) {
    deleteMediaStream(id: $id) {
      message
    }
  }
`;

const ADVANCE_BREWING_PROCESS_MUTATION = gql`
  mutation ($brewingProcessId: ID!) {
    advanceBrewingProcess(brewingProcessId: $brewingProcessId) {
      brewingSteps {
        id
      }
    }
  }
`;

const ADD_USERS_TO_BREWING_PROCESS_MUTATION = gql`
  mutation (
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
  mutation (
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
  mutation (
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
  mutation (
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
  query {
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
  query {
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
  query ($id: ID!) {
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
  query {
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
