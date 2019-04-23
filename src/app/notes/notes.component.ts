import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

	/*
	* Data members for the notes component, title and content of the notes and patient ID
	* for the corrosponding patient. 
	*/

	// public title: string;
	public content: string;
	public id: string;
	

  constructor() { 
  	this.content=''; 
  	this.id='';
  }

  public ngOnInit() {
  }

  // Loads a note from database based on patient ID
	// for now loads in dummy text.
	// TODO:Connect client side api
	public loadNotes() {
		let loadedNote: Object[] = this.getNotesQuery();

		this.content = loadedNote['content'];
		this.id = loadedNote['id'];
	}

	// Placeholder for CLIENT/API getNotes request
	public getNotesQuery() {
		let note: Object[] = [];
		let tmpData: Object = JSON.parse(JSON.stringify(this.constructTestData()));

		// Add validation check for JSON object before copying

		note['content'] = tmpData['content'];
		note['id'] = tmpData['id'];

		return note;
	}


	// Load notes with dummy data
	public constructTestData(){
		return { 'content': 'Dummy text, just a placeholder for actual notes', 'id': '1234'} 
	}

}
