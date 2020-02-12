/* You can only perform one of the following operations at once:

- Modify the provisioned throughput settings of the table.
- Enable or disable DynamoDB Streams on the table.
- Remove a global secondary index from the table.
- Create a new global secondary index on the table. After the index begins backfilling,
you can use UpdateTable to perform other operations. */

/* Idempotent
UpdateTable is an asynchronous operation;
while it is executing, the table status changes from ACTIVE to UPDATING.
While it is UPDATING, you cannot issue another UpdateTable request.
When the table returns to the ACTIVE state, the UpdateTable operation is complete.
*/

/* for performing update on item use updateItem */
