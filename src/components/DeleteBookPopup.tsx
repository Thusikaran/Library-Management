import React from "react";
import "./DeleteBookPopup.css";
import { deleteBook } from "../services/Service";

interface DeleteBookPopupProps {
  closeModel: () => void; 
  bookId: number; 
}

const DeleteBookPopup: React.FC<DeleteBookPopupProps> = ({ closeModel, bookId }) => {
    const handleDelete = async () => {
        try {
           
            await deleteBook(bookId);
            window.alert("Successfully Delete");
            closeModel(); 
            window.location.reload(); 
        } catch (error) {
            console.error("Failed to delete book:", error);
        }
    };
  return (
    <div className="popup-overlay" onClick={closeModel}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Delete Book</h2>
        <p>Are you sure you want to delete this book? This action cannot be undone.</p>
        <div className="popup-buttons">
          <button onClick={closeModel} className="cancel-button">Cancel</button>
          <button onClick={() =>handleDelete()} className="delete-button">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookPopup;
