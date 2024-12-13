import img from "../assets/img/book.png";
import { MdSpaceDashboard } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { GrCatalog } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import './Bookpage.css';
import { useNavigate } from "react-router-dom";
import { FaRegCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdOpenWith } from "react-icons/md";
import { useState, useEffect } from "react";
import AddBookPopup from "../components/AddBookPopup";
import UpdateBookPopup from "../components/UpdateBookPopup";
import DeleteBookPopup from "../components/DeleteBookPopup";
import { getAllBooks, logout, searchByTitle } from "../services/Service";

const BookPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalOpen1, setIsModalOpen1] = useState<boolean>(false);
    const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
    const [book, setBook] = useState<any[]>([]); 
    const [selectedBook, setSelectedBook] = useState<any>(null); 
    const [bookId,setBookId]=useState<any>(null);
    const username = localStorage.getItem("username");
    const [search, setSearch] = useState<String>("");
    console.log(username);
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openModal1 = (bookData: any) => {
        setSelectedBook(bookData); 
        setIsModalOpen1(true);
    };
    const closeModal1 = () => {
        setIsModalOpen1(false);
        setSelectedBook(null); 
    };
    const openModal2 = (bookData: any) => {
        setSelectedBook(bookData);
        setIsModalOpen2(true);
    };
    const closeModal2 = () => {
        setIsModalOpen2(false);
        setSelectedBook(null);
    };

    useEffect(() => {
        if(search == "")
        {
            const fetchBooks = async () => {
                try {
                    const books = await getAllBooks();
                    setBook(books);
                    console.log(books); 
                } catch (error) {
                    console.error("Failed to fetch books:", error);
                }
            };
            fetchBooks();
        }
        else
        {
            const searchBooksByTitle = async (search: any) => {
                try {
                  const data = await searchByTitle(search);
                  setBook(data);
                  console.log(data); 
                } catch (error) {
                  console.error("Failed to search books:", error);
                }
              };
              
              searchBooksByTitle(search); 
        }
    }, [search]); 

    const handleLogout = () => {
        logout();
        navigate("/");
      };



    return (
        <div className="book">
            <div className="book-sidebar">
                <div className="book-sidebar-logo">
                    <img src={img} alt="" />
                    <h3>BookBag</h3>
                </div>
                <div className="sidebar-links">
                    <div className="links-top">
                        <div className="links-link" onClick={() => navigate("/dashboard")}>
                            <MdSpaceDashboard className="icon" />
                            <span>Dashboard</span>
                        </div>
                        <div className="links-link-select" onClick={() => navigate("/book")}>
                            <IoBook className="icon"/>
                            <span>Books</span>
                        </div>
                        <div className="links-link" onClick={() => navigate("/catalog")}>
                            <GrCatalog className="icon"/>
                            <span>Catalog</span>
                        </div>
                        <div className="links-link" onClick={() => navigate("/setting")}>
                            <IoSettingsSharp className="icon"/>
                            <span>Setting</span>
                        </div>
                    </div>
                    <div className="links-bottem" onClick={handleLogout}>
                        <IoLogOut className="icon" />
                        <span>Log Out</span>
                    </div>
                </div>
            </div>

            <div className="body">
                <div className="topbar">
                    <div className="top-searchbar">
                        <input type="text" placeholder="Search by Title" onChange={(e)=>setSearch(e.target.value)} />
                        <FaRegCircle className="icon1" />
                    </div>
                    <div className="top-userdata">
                        <FaBell className="icon-bell" />
                        <span>{username && username.toUpperCase()}</span>
                        <p>{username ? username.charAt(0).toUpperCase() : "T"}</p>
                    </div>
                </div>
                <div className="content">
                    <div className="middle">
                        <h3>Book Management</h3>
                        <div className="addbutton">
                            <button onClick={openModal} >Add Book</button>
                            <FaPlusCircle className="icon-plus"/>
                        </div>
                        {isModalOpen && (
                            <AddBookPopup closeModel={closeModal}/>
                        )}
                    </div>
                    <div className="content-table">
                        <div className="table-title">
                            <div className="id">Id</div>
                            <div className="title">Title</div>
                            <div className="author">Author</div>
                            <div className="description">Description</div>
                            <div className="action">Action</div>
                        </div>
                        {book.length > 0 ? (
                            book.map((data, index) => (
                                <div className="table-data" key={index}>
                                <div className="id">{data.id}</div>
                                <div className="title">{data.title}</div>
                                <div className="author">{data.author}</div>
                                <div className="description">{data.description}</div>
                                <div className="action">
                                    <MdEditSquare className="icon3" onClick={() => openModal1(data)} />
                                    <RiDeleteBin5Fill
                                    className="icon3"
                                    onClick={() => {
                                        openModal2(data);
                                        setBookId(data.id);
                                    }}
                                    />
                                    <MdOpenWith className="icon3" />
                                </div>
                                {isModalOpen1 && selectedBook && (
                                    <UpdateBookPopup closeModel={closeModal1} book={selectedBook} />
                                )}
                                {isModalOpen2 && selectedBook && (
                                    <DeleteBookPopup closeModel={closeModal2} bookId={bookId} />
                                )}
                                </div>
                            ))
                            ) : (
                            <div className="empty-message">No books available</div>
                            )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookPage;
