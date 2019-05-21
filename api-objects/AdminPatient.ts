export class CreatePatientData {
  public patientId : number = 0;
  public firstName : string = '';
  public lastName : string = '';
  public email : string = '';
  public deceased : boolean = false;
  public patientNotes : string = '';
}

export class NoteData {
  public notes : string;
}
