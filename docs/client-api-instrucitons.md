# Client API Setup and Running

*Reference: `https://angular.io/guide/http` for any additional clarifications on Angular's http client object.*

## DEVELOPMENT REFERENCE
### To Create a Service using the Client's Base API 
  * Create the new desired service. (This should be housed in the same folder as the component being serviced)
  * Include the Api service: `import { ServerApiService } from '../services/ServerApi.service';`
  * Add the Service to the Component's Constructor: `constructor (private serverApiService: ServerApiService) { }`
  * Call the GET/POST/DELETE Service as desired. (Add the additional data to the url as desired).
    * In the first variable contains the string to represent the 
    * The second variable, which is optional, is a map of strings to variables which will be added to the API as query parameters.
    * This function will return an `Observable<any>` object to be used as deemed fit. The calling function should typecheck this object by returning a typed observable object.
    * Example: 
    ```javascript
        public searchApiService(PatientId: string): Observable<Response<Appointment[]>> {
            return this.service.get<Appointment[]>('appointments', new Map([['id', PatientId]]));
        }
    ```

### To Use the Service in a Component
  * In the *Component* being serviced, and add the appropriate `.subscribe()` function: For our own convetion: Expected objects will be placed in: `src/app/assets/api-objects` for typechecking purposes. Refer to Branch: https://github.com/movshov/VA-Audiology-App/tree/API/JsonDefinitions to see the suggested ts objects. (Pull request will be added after team confirmation)
    * **Example**: Code to be placed in the component.
        ```javascript
            this.appointmentApiService.getAppointmentReference().subscribe( (response: EXPECTED_OBJECT_TYPE) => {
                this.LOCAL_OJBECT = response.data;
            }); 
        ```
    * *Note:* For Convention: we are storing a response message within `response.status`, and the data object returned within `response.data`. _Refer to the file `api-objects/GenericResponse.ts`.
    * Note: *The *caller* of the API Service should resolve the Observer object in order to take advantage of asychronous calls.
