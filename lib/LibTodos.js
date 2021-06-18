const sqlite = require('sqlite');
const sqlite3= require('sqlite3');
import {open} from 'sqlite';

var config = require('../config.json')['development'];
//
export default {
  get_items :async function(){
    try {
//      var item = []
      var dbFile = config.DB_FILE_NAME
      const db = await open(
        {filename: dbFile , driver: sqlite3.Database}
      );
      const items = await db.all('select * from todos order by id desc');      
// console.log( item)     
      return items
    } catch (err) {
        throw new Error('Error , get_items');
    }          
  },    
  get_todo :async function(id){
    try {
// console.log( item)            
      var dbFile = config.DB_FILE_NAME
      const db = await open(
        {filename: dbFile , driver: sqlite3.Database}
      );
      var sql ="select * from todos where id=" + id
      const items = await db.all(sql);    
      var item = items[0]          
      return item
    } catch (err) {
      throw new Error('Error , get_todo');
    }          
  },
  add_todo :async function(args){
    try {
      var dbFile = config.DB_FILE_NAME
      const db = await open(
        {filename: dbFile , driver: sqlite3.Database}
      );
      const result = await db.run(
        'INSERT INTO todos (title) VALUES (?)',
        args.title,
      )              
// console.log( item)            
      return args
    } catch (err) {
      throw new Error('Error , add_todo');
    }          
  },
  update_todo :async function(args){
    try {
      var dbFile = config.DB_FILE_NAME
      const db = await open(
        {filename: dbFile , driver: sqlite3.Database}
      );
      const result = await db.run(
        'UPDATE todos SET title = ? WHERE id = ?',
        args.title,
        args.id
      )       
// console.log( item)            
      return args
    } catch (err) {
      throw new Error('Error , update_todo');
    }          
  },
  delete_todo :async function(args){
    try {
      var dbFile = config.DB_FILE_NAME
      const db = await open(
        {filename: dbFile , driver: sqlite3.Database}
      );
      const result = await db.run(
        'delete from todos  WHERE id = ?',
        args.id
      )        
// console.log( item)            
      return args
    } catch (err) {
      throw new Error('Error , delete_todo');
    }          
  },  
}
