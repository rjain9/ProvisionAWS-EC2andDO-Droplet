# HW1-Part2
CSC-DevOps Spring 2018: HW1-Part2

Name: Rishi Jain

Unity ID: rjain9

## Steps in provisioning the server


## Concepts

1. Define idempotency. Give two examples of an idempotent operation and non-idempotent operation.

   An idempotent operation is one that has no additional effect if it is called more than once with the same input              parameters. And this property is called idempotency. 
   
   The following are the examples:
   * For example HTTP methods like **GET** and **HEAD** are idempotent since they are only intended for retrieving data.          Hence multiple identical requests of them will behave the same way, given that there is no change in the resource's          state between the requests.
   * HTTP methods like **POST** and **PATCH** are not idempotent since once they are executed successfully, the next time          they are executed with the same parameters, there will be a different response.

2. Describe several issues related to management of your inventory.
   
   The following are the issues related to management of your inventory:
   * Management to the vast list of assests and ip addresses.
   * Monitoring all of these assets.
   * Managing and isolating access to certain servers and secret configuration.
   * Managing live servers and their dynamic configuration properties can be difficult to manage.
   
3. Describe two configuration models. What are disadvantages and advantages of each model?

   The two configuration models are :
   1. Push model: The central server pushes the configuration and software to the individual servers and runs commands             remotely. The assets are centrally managed.
      Advantages:
      * It is easier to manage.
      * The central server can coordinate with application servers to come up in a particular order.
      * Less likely to security breach as only central server has access to the application servers.
      Disadvantages:
      * Due to Less enforcement of state the asset can drift from config.
      * Central server will need to have a connection back to every application server and this leads to performance and             scalability problems.
   2. Pull model: The individual servers contact the central server, download their configuration and software, and configure       themselves.
      Advantages:
      * Better at ensuring assets stay in sync with config. i.e, agent can enforce state.
      * Each server has information about how to obtain it's configuration, when it boots it can continue to proceed without         intervention from the master server.   
      Disadvantages:
      * More complex.
      * More likely to security breach as each application server connects back to the central server.

4. What are some of the consquences of not having proper configuration management?

   The following are the consequences of not having proper configuration management:
   * Can lead to inconsistent systems.
   * Losing productivity when you replace a component with a flawed new version and can’t quickly revert to a working state.
   * Inability to accurately determine the impact of change requests on the full enterprise.
   * Security weaknesses and vulnerabilities can go undetected for extended periods due to unauthorized changes.
   * Extended outage durations and high cost of outages due to lack of readily available actionable data to the service desk.
