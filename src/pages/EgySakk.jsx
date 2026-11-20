import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const EgySakk =()=> {
  const params = useParams();
  const id = params.chessId;
  const [sakkozo, setSakkozo] = useState([]);
  const [tolt, setTolt] = useState(false);
  const [hiba, setHiba] = useState(null);

  useEffect(()=>{
    setTolt(true);
    axios
    .get(`https://chess.sulla.hu/chess/${id}`)
    .then((res) => setSakkozo(res.data))
    .catch((error) => {
        setHiba(error);
        console.error("Hiba: ", hiba)})
    .finally(()=> setTolt(false));
    },[id]);
return(
     <div className="p-5 m-auto text-center content bg-ivory">
    {tolt ? 
    <div className="spinner-border text-warning"></div> : 
    <div>
        <h2>Sakkozó adatai</h2>
            <div className="card p-3">
                <h5 className="card-title">Sakkozó neve: { sakkozo.name }</h5>
                <p className="lead">Születési éve: { sakkozo.birth_date }</p>
                <p className="lead">Nyert világbajnokságai: { sakkozo.world_ch_won }</p>
            <div className="card-body">
                <Link to={ sakkozo.profile_url } target="_blank">
                Profil link</Link><br />
                <Link to={ "/"}>
                <img alt={ sakkozo.name } 
                className="img-fluid"
                style={{ maxHeight: 200 }}
                src={ sakkozo.image_url || "https://placehold.co/400x800" } /></Link> 
                <br />
                <Link to={ "/" }>
                <i className="bi bi-arrow-return-left fs-2"></i></Link> &nbsp;&nbsp;
                <Link to={"/mod-chess/" + sakkozo.id}>
                <i className="bi bi-pencil fs-2"></i></Link> &nbsp;&nbsp;
                <Link to={"/del-chess/" + sakkozo.id}>
                <i className="bi bi-trash3 fs-2"></i></Link>
            </div>
            </div>
    </div>
    }
    </div>
);
}