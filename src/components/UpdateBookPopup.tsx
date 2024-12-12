import { useState } from "react";
import "./Popup.css"
import { IoBookSharp } from "react-icons/io5";
import { updateBook } from "../services/Service";

interface UpdateBookPopupProps {
    closeModel: () => void; 
    book: any;
  }
  
  const UpdateBookPopup: React.FC<UpdateBookPopupProps> = ({ closeModel ,book}) => {
     const [title,setTitle]= useState(book.title)
     const [author,setAuthor]= useState(book.author)
     const [description,setDescription]= useState(book.description)

          const handleUpdateBook = async () => {
            if (!title || !author || !description) {
                window.alert("Please fill in all fields.");
                return;
            }
     
          const newBook = {
              title,
              author,
              description,
          };
     
       try {
           await updateBook(newBook,book.id);
           window.alert("Book successfully updated!");
           window.location.reload(); 
           closeModel();  
           setTitle("");
           setAuthor("");
           setDescription("");
       } catch (error) {
           console.error("Failed to update book:", error);
           window.alert("Failed to update the book. Please try again.");
       }
     };

    return (
      <div className="modal-overlay" onClick={closeModel}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="addbook-title">
             <div className="icon-box"><IoBookSharp className="icon-book"/></div>
             <h2>Update Book</h2>
          </div>
          <div>
             <div className="inputBox1">
                <input placeholder="Title"   type="text" value={title}  onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="inputBox1">
                    <input placeholder="Author"    type="text" value={author} onChange={(e)=>setAuthor(e.target.value)} />
            </div>
            <div className="inputBox1">
                    <textarea placeholder="Description"    value={description} onChange={(e)=>setDescription(e.target.value)} />
            </div>
          </div>
          <div className="popup-button">
             <button className="close" onClick={closeModel}>CANCEL</button>
             <button className="add" onClick={()=>handleUpdateBook()}>UPDATE</button>
          </div>
         
        </div>
      </div>
    );
  };
  
  export default UpdateBookPopup;
  