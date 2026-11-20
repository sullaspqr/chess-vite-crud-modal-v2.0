import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DelSakk =() => {
 const params = useParams();
 const id = params.chessId;
 const navigate = useNavigate();
 const [sakk, setSakk] = useState({});
 const [showModal, setShowModal] = useState(false);
  const [hiba, setHiba] = useState(null);
  
  useEffect(()=>{
    axios
    .get(`https://chess.sulla.hu/chess/${id}`)
    .then((res) => setSakk(res.data))
    .catch((error) => {
        setHiba(error);
        console.error("Hiba: ", hiba)})
    },[id]);
return(
    <>
     <div className="p-5 m-auto text-center content bg-ivory">
    <div>
        <h2>Törlendő elem:</h2>
            <div className="card p-3">
                <h5 className="card-title">Sakkozó neve: { sakk.name }</h5>
                <p className="lead">Születési éve: { sakk.birth_date }</p>
                <p className="lead">Nyert világbajnokságai: { sakk.world_ch_won }</p>
            <div className="card-body">
                <Link to={ sakk.profile_url } target="_blank" className="btn btn-primary">
                Profil link</Link><br /><br />
                <Link to={ "/"}>
                <img alt={ sakk.name } 
                className="img-fluid"
                style={{ maxHeight: 200 }}
                src={ sakk.image_url || "https://placehold.co/400x800" } /></Link> 
                <br /><br />
                <Link to={ "/" } className="btn btn-warning">
                <i className="bi bi-arrow-return-left fs-2"></i></Link>
            </div>
            <form onSubmit={(event) =>{
                event.preventDefault();
                axios.delete(`https://chess.sulla.hu/chess/${id}`)
                .then(()=>setShowModal(true))
                .catch((error)=> (console.log('Hiba: ', error)))
            }}>
                <button type="submit" className="btn btn-danger">Törlés</button>
            </form>
            </div>
    </div>
    </div>
     {showModal && (
            <div className="modal fade show d-block" tabIndex="-1"
            style={{zIndex: 1055}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title">Sikeres törlés!</h5>
                        </div>
                        <div className="modal-body">
                            A sakkozót sikeresen töröltük!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger"
                            onClick={()=>navigate("/")}>Rendben</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
);

}