import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const ModSakk = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.chessId;
    const [showModal, setShowModal] = useState(false);
    const [hiba,setHiba] =useState(null);
    const [sakk, setSakk] = useState({
        name: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });
useEffect(()=>{
    const adatokLehivasa = async() => {
        try {
            const valasz = await axios.get(`https://chess.sulla.hu/chess/${id}`);
            setSakk(valasz.data);
        }
        catch(error) {
            setHiba(error);
            console.log("Hiba: ", hiba);
        }
    };
    adatokLehivasa();
}, [id]);
const kuldesKezelo = async(event) => {
    event.preventDefault();
    try {
        await axios.put(`https://chess.sulla.hu/chess/${id}`, sakk)
        .then(()=> {setShowModal(true);})    
    }
    catch(error) {console.log(error);}
};
const valtozasKezelo = (event) => {
    const { name, value } = event.target;
    setSakk(prevState => ({
        ...prevState,
        [name]: value
    }));
};
    return(
        <>
        <div className="p-5 content bg-ivory text-center">
            <form onSubmit={kuldesKezelo}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Sakkozó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" 
                        defaultValue={sakk.name} onChange={valtozasKezelo} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Születési éve:</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" 
                         defaultValue={sakk.birth_date} onChange={valtozasKezelo} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyert VB-k száma:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" 
                         value={sakk.world_ch_won.toString()} onChange={valtozasKezelo} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control"
                         defaultValue={sakk.profile_url} onChange={valtozasKezelo} />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="form-control"
                         defaultValue={sakk.image_url} onChange={valtozasKezelo} />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">
                    <i className="bi bi-send"></i>&nbsp;&nbsp;Küldés
                </button>
            </form>
        </div>
        {showModal && (
            <div className="modal fade show d-block" tabIndex="-1"
            style={{zIndex: 1055}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Sikeres módosítás!</h5>
                        </div>
                        <div className="modal-body">
                            A sakkozó adatait sikeresen módosítottuk!
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary"
                            onClick={()=>navigate("/")}>Rendben</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}