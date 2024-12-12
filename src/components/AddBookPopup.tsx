import { useState } from "react";
import "./Popup.css"
import { IoBookSharp } from "react-icons/io5";
import { addBook } from "../services/Service";

interface AddBookPopupProps {
    closeModel: () => void; 
  }
  
  const AddBookPopup: React.FC<AddBookPopupProps> = ({ closeModel }) => {
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [description, setDescription] = useState<string>("");

     const handleAddBook = async () => {
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
      await addBook(newBook);
      window.alert("Book successfully added!");
      window.location.reload(); 
      closeModel();  
      setTitle("");
      setAuthor("");
      setDescription("");
  } catch (error) {
      console.error("Failed to add book:", error);
      window.alert("Failed to add the book. Please try again.");
  }
};
    return (
      <div className="modal-overlay" onClick={closeModel}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="addbook-title">
             <div className="icon-box"><IoBookSharp className="icon-book"/></div>
             <h2>Add Book</h2>
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
             <button className="add" onClick={()=>handleAddBook()}>ADD</button>
          </div>
         
        </div>
      </div>
    );
  };
  
  export default AddBookPopup;
  