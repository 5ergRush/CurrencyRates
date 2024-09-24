# CurrencyRates

This is a test project for interview purposes.

Application is intended for fetching data from a WebSocket server and displaying the contents in a table.

For performance reasons, OnPush change detection strategy has been implemented, and the data is displayed via async pipe, to avoid memory leaks or unhandled subscriptions.
Buffering of the data for 500ms is used. The number has been chosen according to the suggestions in the specification of the task.

The structure of the data and its flow is quite simple, as it's just a stream of data from a node.js server.
The data needs to be visualized as a table, but it's not subject to transformations on the app itself.
The app also has just one page, dedicated to the mentioned table.
As such, the choice has been made toward RxJs instead of NgRx, as a lack of complex data in conjunction with NgRx store would just complicate the application code unnecessarily.
NgRx would make sense for a more complex data flow and structure, as a simple example would be a case when we have a messaging service of sorts, that together with the rates data also sends us keys and values of the messages, and we need to store a language preference on the application to transform these multilingual strings into an actual text depending on the active language at the moment. This would already be a state which would not consist of just one type of data, and would instead be multiple entities. As such it might make sense to use RxJs having in mind the possibility of even further increase in the complexity in the future.
For the sake of simplicity this has been omitted, however if you want to see it in action just let me know, I can create that on a separate branch as well.