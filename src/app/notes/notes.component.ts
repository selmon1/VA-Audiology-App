import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilities } from '../common/utlilities';
import { BrowserModule } from '@angular/platform-browser';

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

	public title: string;
	public content: string;
	public id: string;
	

  constructor() { 
  	this.title=''; 
  	this.content=''; 
  	this.id='';
  }

  ngOnInit() {
  }

  // Loads a note from database based on patient ID
	// for now loads in dummy text.
	// TODO:Connect client side api
	public loadNotes() {
		let loadedNote: Object[] = this.getNotesQuery();

		this.title = loadedNote['title'];
		this.content = loadedNote['content'];
		this.id = loadedNote['id'];
	}

	// Placeholder for CLIENT/API getNotes request
	public getNotesQuery() {
		let note: Object[] = [];
		let tmpData: Object = JSON.parse(JSON.stringify(this.constructTestData()));

		// Add validation check for JSON object before copying
		
		note['title'] = tmpData['title'];
		note['content'] = tmpData['content'];
		note['id'] = tmpData['id']; 

		return note;
		
	}


	// Load notes with dummy data
	public constructTestData(){
		return { 'title': 'This is a test', 'content': 'This is just a placeholder', 'id': '1234'} 
	}

}
