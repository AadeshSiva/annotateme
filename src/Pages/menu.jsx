import './Pages.css'
import txt from '../assets/txt.svg'
import img from '../assets/img.svg'
import aud from '../assets/audio.svg'
import { Link } from 'react-router-dom';
export default function menu() {
    return (
        <><div className="menucontainer">
            <p className='logotxt'>AnnotateMe.</p>
            <h1 className='menuh1txt'>Convert Anything into <span className="highlight">Actionable Data.</span></h1>

            <div className="menuoptioncon">
                <Link to="/textannotiate" className='menuoption'>Text Annotation</Link>
                <Link className='menuoption'>Image Annotation</Link>
                <Link className='menuoption'>Audio Annotation</Link>
            </div>

        </div>
        </>
    )
}