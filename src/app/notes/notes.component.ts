import { Component, OnInit } from '@angular/core';
import { Observable } from '@rxjs'

// Define a type alias for a note
// This will be used to typecheck incoming objects
// and return a notes object of this form
type NoteObj = {
    content: string;
    id: number;
}

@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})



export class NotesComponent implements OnInit {

	/*
	* Data members for the notes component, content of the notes and patient ID
	* for the corrosponding patient. 
	*/

	
  public content: string;
  public id: number;
	

  constructor() { 

  }

  public ngOnInit() {
  }

// Placeholder for CLIENT/API getNotes request
// Checks for correct types, copys and returns a note object
// if match. Otherwise throws an error
  public getNotesQuery(): void{
		let tmpData: NoteObj = JSON.parse(JSON.stringify(this.constructTestData()));

		if(typeof(tmpData.content) === 'string' && typeof(tmpData.id) === 'number') {

            this.content = tmpData.content;
            this.id = tmpData.id;

        } else {
            console.error('Incorrect Types!');
        }
	}


// Load notes with dummy data
  public constructTestData() {
      return { 
               'status': 200,
               'confirmation': 'Success',
               'content': 'Dummy text, just a placeholder for actual notes',
               'id': 1234
             }; 
    }

}
