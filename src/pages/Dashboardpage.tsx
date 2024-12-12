import img from "../assets/img/book.png"
import { MdSpaceDashboard } from "react-icons/md";
import { IoBook } from "react-icons/io5";
import { GrCatalog } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import './Bookpage.css'
import { useNavigate } from "react-router-dom";
import { logout } from "../services/Service";

const Dashboardpage = () => {
    const navigate = useNavigate();
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
                    <div className="links-link-select" onClick={()=>navigate("/dashboard")}>
                       <MdSpaceDashboard className="icon" />
                       <span>Dashboard</span>
                    </div>
                    <div className="links-link" onClick={()=>navigate("/book")}>
                       <IoBook className="icon"/>
                       <span>Books</span>
                    </div>
                    <div className="links-link" onClick={()=>navigate("/catalog")}>
                      <GrCatalog className="icon"/>
                      <span>Catalog</span>
                    </div>
                    <div className="links-link" onClick={()=>navigate("/setting")}>
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

        <div>
            <h1>Dashboard Page</h1>
        </div>
    </div>
  )
}

export default Dashboardpage