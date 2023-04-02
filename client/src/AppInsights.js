import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin, withAITracking } from "@microsoft/applicationinsights-react-js";

var reactPlugin = new ReactPlugin();

var appInsights = new ApplicationInsights({
  config: {
    connectionString: process.env.REACT_APP_APPLICATIONINSIGHTS_CONNECTION_STRING,
    enableAutoRouteTracking: true,
    extensions: [reactPlugin],
  },
});

appInsights.loadAppInsights();

export { reactPlugin, appInsights };
